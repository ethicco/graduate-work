import {
  IMessage,
  ISendMessage,
  ISupportRequest,
  SupportRequestRepository,
  UserRoleEnum,
} from '@/db';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AppealResponse, FindAppealSupportRequest } from '../dto';
import { MessageResponse } from '../dto/response/message.response';
import { ReadMessageRequest } from '../dto/request/read-message.response';
import { ReadMessageResponse } from '../dto/response/read-message.response';
import { Subject, Subscription } from 'rxjs';

@Injectable()
export class SupportRequestService {
  private readonly messageStream = new Subject<{
    supportRequest: ISupportRequest;
    message: IMessage;
  }>();

  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  publish(supportRequest: ISupportRequest, message: IMessage) {
    this.messageStream.next({ supportRequest, message });
  }

  subscribe(
    handler: (supportRequest: ISupportRequest, message: IMessage) => void,
  ): () => void {
    const subscription: Subscription = this.messageStream.subscribe((event) =>
      handler(event.supportRequest, event.message),
    );

    return () => subscription.unsubscribe();
  }

  async findAppealSupportRequests(
    params: FindAppealSupportRequest,
    userId?: string,
  ): Promise<Array<AppealResponse>> {
    const appealList = await this.supportRequestRepository.getList({
      ...params,
      userId,
    });

    return appealList.map((appeal) => ({
      id: appeal.id,
      userId: userId ? (appeal.userId as string) : appeal.userId,
      isActive: appeal.isActive,
      createdAt: appeal.createdAt,
      hasNewMessages: !!appeal.messages?.length,
    }));
  }

  async getMessages(supportRequestId: string): Promise<MessageResponse[]> {
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

  async readMessage(
    id: string,
    user: Express.User,
    dto: ReadMessageRequest,
  ): Promise<ReadMessageResponse> {
    const supportRequest =
      await this.supportRequestRepository.getSupportRequestById(id);

    if (
      user.role === UserRoleEnum.CLIENT &&
      supportRequest?.userId !== user.id
    ) {
      throw new ForbiddenException('Access denied');
    }

    return this.supportRequestRepository.readMessages(id, user.id, {
      readAt: dto.createdBefore,
    });
  }
}
