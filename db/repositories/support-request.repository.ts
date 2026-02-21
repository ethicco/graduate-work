import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IGetChatListParams,
  IReadMessage,
  IReadMessageResponse,
  ISendMessage,
  ISupportRequest,
  ISupportRequestCreate,
} from '../interfaces';
import { SupportRequest } from '../schemes';

@Injectable()
export class SupportRequestRepository {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly supportRequestModel: Model<SupportRequest>,
  ) {}

  async create(data: ISupportRequestCreate): Promise<ISupportRequest> {
    const appeal = await this.supportRequestModel.create({
      userId: data.userId as string,
      isActive: true,
      messages: [
        {
          authorId: data.userId as string,
          text: data.text,
        },
      ],
    });

    return appeal.populate('userId');
  }

  sendMessage(data: ISendMessage): Promise<ISupportRequest | null> {
    return this.supportRequestModel
      .findByIdAndUpdate(
        data.supportRequestId,
        { $push: { messages: { authorId: data.authorId, text: data.text } } },
        { new: true, projection: { messages: { $slice: -1 } } },
      )
      .populate(['userId', 'messages.authorId'])
      .exec();
  }

  getSupportRequestById(id: string): Promise<ISupportRequest | null> {
    return this.supportRequestModel
      .findById(id)
      .populate('messages.authorId')
      .exec();
  }

  getList(params: IGetChatListParams): Promise<Array<ISupportRequest>> {
    const { userId, isActive, offset, limit } = params;

    return this.supportRequestModel
      .find({
        userId,
        isActive,
      })
      .skip((offset - 1) * limit)
      .limit(limit)
      .populate('userId')
      .exec();
  }

  async readMessages(
    id: string,
    userId: string,
    dto: IReadMessage,
  ): Promise<IReadMessageResponse> {
    console.log(dto);

    await this.supportRequestModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          'messages.$[msg].readAt': dto.readAt,
        },
      },
      {
        arrayFilters: [
          {
            'msg.readAt': null,
            'msg.authorId': { $ne: userId },
          },
        ],
      },
    );

    return { success: true };
  }
}
