import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SupportRequestRepository } from '@/db';

@Injectable()
export class ChatAccessGuard implements CanActivate {
  constructor(
    private readonly supportRequestRepository: SupportRequestRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    const chatId = data.chatId as string;
    const user = client.user;

    if (!Types.ObjectId.isValid(chatId)) return false;

    const chat = await this.supportRequestRepository.getSupportRequestById(
      new Types.ObjectId(chatId),
    );
    if (!chat) return false;

    if (user.role === 'manager') return true;
    if (user.role === 'client' && user.id === chat.userId) return true;

    return false;
  }
}
