import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { ClientSupportRequestService, SupportRequestService } from './services';
import { ClientSupportRequestController } from './client-support-request.controller';
import { ManagerSupportRequestController } from './manasger-support-request.controller';
import { CommonSupportRequestController } from './common-support-request.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ClientSupportRequestController,
    ManagerSupportRequestController,
    CommonSupportRequestController,
  ],
  providers: [ClientSupportRequestService, SupportRequestService],
})
export class SupportRequestModule {}
