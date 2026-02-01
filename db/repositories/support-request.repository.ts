import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IGetChatListParams,
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

  create(data: ISupportRequestCreate): Promise<ISupportRequest> {
    return this.supportRequestModel.create({
      userId: data.userId,
      isActive: true,
      messages: [
        {
          authorId: data.userId,
          text: data.text,
        },
      ],
    });
  }

  sendMessage(data: ISendMessage): Promise<ISupportRequest | null> {
    return this.supportRequestModel.findByIdAndUpdate(
      data.supportRequestId,
      { $push: { messages: { authorId: data.authorId, text: data.text } } },
      { new: true, projection: { messages: { $slice: -1 } } },
    );
  }

  getSupportRequestById(id: string): Promise<ISupportRequest | null> {
    return this.supportRequestModel.findById(id).exec();
  }

  getList(params: IGetChatListParams): Promise<Array<ISupportRequest>> {
    const { userId, isActive } = params;

    return this.supportRequestModel
      .find({
        userId,
        isActive,
      })
      .exec();
  }

  // deleteById(id: string): Promise<IUser | null> {
  //   return this.supportRequestModel.findByIdAndDelete(id).exec();
  // }
}
