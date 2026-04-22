import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import {
  ClientSupportRequestService,
  EmployeeSupportRequestService,
  SupportRequestService,
} from './services';
import { ClientSupportRequestController } from './client-support-request.controller';
import { ManagerSupportRequestController } from './manasger-support-request.controller';
import { CommonSupportRequestController } from './common-support-request.controller';
import { SupportChatGateway } from './getways/support-chat.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ClientSupportRequestController,
    ManagerSupportRequestController,
    CommonSupportRequestController,
  ],
  providers: [
    ClientSupportRequestService,
    EmployeeSupportRequestService,
    SupportRequestService,
    SupportChatGateway,
  ],
})
export class SupportRequestModule {}
