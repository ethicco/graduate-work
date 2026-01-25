import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {}
