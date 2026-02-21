import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload } from './types';
import { UserRoleEnum } from '@/db';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_AUTH_SECRET', 'secret'),
    });
  }

  validate(payload: JwtPayload): {
    id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    iat: number;
    exp: number;
  } {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp,
    };
  }
}
