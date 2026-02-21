import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const user = client.request?.user;

    if (!user) throw new UnauthorizedException('Not authenticated');

    client.user = user;
    return true;
  }
}
