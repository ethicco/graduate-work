import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonUtils } from '@/common/utils/common.utils';
import { UserAdminController } from './user-admin.controller';
import { UserManagerController } from './user-manager.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UserAdminController, UserManagerController],
  providers: [UserService, CommonUtils],
})
export class UserModule {}
