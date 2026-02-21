import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@/common/strategies';
import { SessionSerializer } from '@/common/serializers';
import { DatabaseModule } from '@/db';
import { AuthController } from './auth.controller';
import { CommonUtils } from '@/common/utils/common.utils';
import { AuthClientController } from './auth-client.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseModule, PassportModule.register({ session: true })],
  controllers: [AuthClientController, AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, CommonUtils],
})
export class AuthModule {}
