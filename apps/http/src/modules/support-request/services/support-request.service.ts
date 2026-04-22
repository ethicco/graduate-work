import {
  IMessage,
  ISendMessage,
  ISupportRequest,
  IUser,
  SupportRequestRepository,
} from '@/db';
import { Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  AppealManagerResponse,
  AppealResponse,
  FindAppealSupportRequest,
} from '../dto';
import { MessageResponse } from '../dto/response/message.response';

const NEW_MESSAGE_EVENT = 'support-request.new-message';

@Injectable()
export class SupportRequestService {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  publish(supportRequest: ISupportRequest, message: IMessage) {
    this.eventEmitter.emit(NEW_MESSAGE_EVENT, { supportRequest, message });
  }

  subscribe(
    handler: (supportRequest: ISupportRequest, message: IMessage) => void,
  ): () => void {
    const listener = (event: {
      supportRequest: ISupportRequest;
      message: IMessage;
    }) => handler(event.supportRequest, event.message);

    this.eventEmitter.on(NEW_MESSAGE_EVENT, listener);

    return () => this.eventEmitter.off(NEW_MESSAGE_EVENT, listener);
  }

  async findSupportRequests(
    params: FindAppealSupportRequest,
    userId: string,
  ): Promise<Array<AppealResponse>> {
    const appealList = await this.supportRequestRepository.getList({
      ...params,
      userId,
    });

    return appealList.map((appeal) => ({
      id: appeal.id,
      userId,
      isActive: appeal.isActive,
      createdAt: appeal.createdAt,
      hasNewMessages: (appeal.messages || []).some(
        ({ readAt, authorId }) =>
          !readAt && (authorId as string).toString() !== userId,
      ),
    }));
  }

  async findSupportRequestsForManager(
    params: FindAppealSupportRequest,
  ): Promise<Array<AppealManagerResponse>> {
    const appealList = await this.supportRequestRepository.getList({
      ...params,
      userId: undefined,
    });

    return appealList.map((appeal) => {
      const user = appeal.userId as Omit<IUser, 'role'>;
      return {
        id: appeal.id,
        client: {
          id: user.id,
          email: user.email,
          name: user.name,
          contactPhone: user.contactPhone,
        },
        isActive: appeal.isActive,
        createdAt: appeal.createdAt,
        hasNewMessages: (appeal.messages || []).some(
          ({ readAt, authorId }) =>
            !readAt && (authorId as string).toString() === user.id,
        ),
      };
    });
  }

  async getMessages(
    supportRequestId: Types.ObjectId,
  ): Promise<MessageResponse[]> {
    const supportRequest =
      await this.supportRequestRepository.getSupportRequestById(
        supportRequestId,
      );

    if (!supportRequest) {
      throw new NotFoundException('Chat not found');
    }

    return (supportRequest.messages || []).map((message) => ({
      id: message.id!,
      createdAt: message.sentAt,
      text: message.text,
      readAt: message.readAt!,
      authorId: {
        id: message.authorId['id'] as string,
        name: message.authorId['name'] as string,
      },
    }));
  }

  async sendMessage(data: ISendMessage): Promise<Array<MessageResponse>> {
    const supportRequest =
      await this.supportRequestRepository.sendMessage(data);

    if (!supportRequest) {
      throw new NotFoundException('Chat not found');
    }

    this.publish(supportRequest, {
      text: data.text,
      authorId: data.authorId,
      sentAt: new Date(),
    });

    return supportRequest.messages!.map((message) => ({
      id: message.id!,
      createdAt: message.sentAt,
      text: message.text,
      readAt: message.readAt!,
      authorId: {
        id: message.authorId['id'] as string,
        name: message.authorId['name'] as string,
      },
    }));
  }
}
