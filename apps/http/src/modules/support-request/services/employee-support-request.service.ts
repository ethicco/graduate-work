import { IMarkMessagesAsRead, SupportRequestRepository } from '@/db';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class EmployeeSupportRequestService {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  async markMessagesAsRead(params: IMarkMessagesAsRead): Promise<void> {
    await this.supportRequestRepository.markMessagesAsRead(params);
  }

  getUnreadCount(
    supportRequestId: Types.ObjectId,
    userId: string,
  ): Promise<number> {
    return this.supportRequestRepository.getUnreadCount(
      supportRequestId,
      userId,
    );
  }

  async closeRequest(supportRequestId: Types.ObjectId): Promise<void> {
    await this.supportRequestRepository.closeRequest(supportRequestId);
  }
}
