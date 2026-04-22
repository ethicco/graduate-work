import {
  IMarkMessagesAsRead,
  ISupportRequestCreate,
  SupportRequestRepository,
} from '@/db';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { AppealResponse } from '../dto';

@Injectable()
export class ClientSupportRequestService {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  async createSupportRequest(
    data: ISupportRequestCreate,
  ): Promise<AppealResponse[]> {
    const appeal = await this.supportRequestRepository.create(data);

    return [
      {
        id: appeal.id,
        userId: appeal.userId as string,
        isActive: appeal.isActive,
        createdAt: appeal.createdAt,
        hasNewMessages: false,
      },
    ];
  }

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
}
