import { UserRoleEnum } from '@/db';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Request } from 'express';

export function RolesGuard(roles: Array<UserRoleEnum>) {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();

      return roles.includes(request.user!.role);
    }
  }

  return mixin(RolesGuardMixin);
}
