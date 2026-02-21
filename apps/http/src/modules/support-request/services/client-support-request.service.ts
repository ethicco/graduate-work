import { ISupportRequestCreate, SupportRequestRepository } from '@/db';
import { Injectable } from '@nestjs/common';
import { AppealResponse } from '../dto';

@Injectable()
export class ClientSupportRequestService {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  async createSupportRequest(
    data: ISupportRequestCreate,
  ): Promise<AppealResponse> {
    const appeal = await this.supportRequestRepository.create(data);

    return {
      id: appeal.id,
      userId: appeal.userId as string,
      isActive: appeal.isActive,
      createdAt: appeal.createdAt,
      hasNewMessages: !!appeal.messages?.length,
    };
  }
}
