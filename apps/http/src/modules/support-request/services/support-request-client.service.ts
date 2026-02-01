import {
  ISupportRequest,
  ISupportRequestCreate,
  SupportRequestRepository,
} from '@/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SupportRequestClient {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  createSupportRequest(data: ISupportRequestCreate): Promise<ISupportRequest> {
    return this.supportRequestRepository.create(data);
  }
  // markMessagesAsRead(params: MarkMessagesAsReadDto);
  // getUnreadCount(supportRequest: ID): Promise<number>;
}
