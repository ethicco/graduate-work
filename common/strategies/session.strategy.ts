import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser, UserRepository } from '@/db';
import { CommonUtils } from '../utils/common.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonUtils: CommonUtils,
    private readonly configService: ConfigService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<IUser, 'passwordHash'>> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isVerified = await this.commonUtils.verifyPassword(
      password,
      user.passwordHash!,
      this.configService.get('PASSWORD_SALT', 'sault'),
    );

    if (!isVerified) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      contactPhone: user.contactPhone,
      role: user.role,
    };
  }
}
