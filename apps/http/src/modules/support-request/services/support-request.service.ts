import {
  IGetChatListParams,
  IMessage,
  ISendMessage,
  ISupportRequest,
  SupportRequestRepository,
} from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SupportRequestService {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  findSupportRequests(
    params: IGetChatListParams,
  ): Promise<Array<ISupportRequest>> {
    return this.supportRequestRepository.getList(params);
  }

  async sendMessage(data: ISendMessage): Promise<IMessage> {
    const supportRequest =
      await this.supportRequestRepository.sendMessage(data);

    if (!supportRequest) {
      throw new NotFoundException('Chat not found');
    }

    return supportRequest.messages![0];
  }
  async getMessages(supportRequestId: string): Promise<IMessage[]> {
    const supportRequest =
      await this.supportRequestRepository.getSupportRequestById(
        supportRequestId,
      );

    if (!supportRequest) {
      throw new NotFoundException('Chat not found');
    }

    return supportRequest.messages || [];
  }

  subscribe(
    handler: (supportRequest: ISupportRequest, message: IMessage) => void,
  ): () => void {
    return () => undefined;
  }
}
