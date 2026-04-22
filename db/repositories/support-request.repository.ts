import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IGetChatListParams,
  IMarkMessagesAsRead,
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

  getSupportRequestById(id: Types.ObjectId): Promise<ISupportRequest | null> {
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

  async markMessagesAsRead(params: IMarkMessagesAsRead): Promise<void> {
    await this.supportRequestModel.updateOne(
      { _id: new Types.ObjectId(params.supportRequestId) },
      { $set: { 'messages.$[msg].readAt': new Date() } },
      {
        arrayFilters: [
          {
            'msg.readAt': null,
            'msg.authorId': { $ne: new Types.ObjectId(params.userId) },
            'msg.sentAt': { $lte: params.createdBefore },
          },
        ],
      },
    );
  }

  async getUnreadCount(
    supportRequestId: Types.ObjectId,
    userId: string,
  ): Promise<number> {
    const request = await this.supportRequestModel
      .findById(supportRequestId)
      .select('messages')
      .exec();

    if (!request) return 0;

    return (request.messages || []).filter(
      (msg) => !msg.readAt && msg.authorId.toString() !== userId,
    ).length;
  }

  async closeRequest(id: Types.ObjectId): Promise<void> {
    await this.supportRequestModel
      .findByIdAndUpdate(id, { isActive: false })
      .exec();
  }
}
