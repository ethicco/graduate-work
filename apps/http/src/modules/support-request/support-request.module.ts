import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { SupportRequestClient, SupportRequestService } from './services';
import { ChatController } from './chat.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ChatController],
  providers: [SupportRequestClient, SupportRequestService],
})
export class SupportRequestModule {}
