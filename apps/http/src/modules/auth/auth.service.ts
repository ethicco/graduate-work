import { UserRoleEnum, UserRepository } from '@/db';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CommonUtils } from '@/common/utils/common.utils';
import { ConfigService } from '@nestjs/config';
import { RegisterUserRequest } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonUtils: CommonUtils,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterUserRequest & { role: UserRoleEnum }) {
    const exists = await this.userRepository.getByEmail(dto.email);

    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await this.commonUtils.generateHashPassword(
      dto.password,
      this.configService.get('PASSWORD_SALT', 'sault'),
    );

    const user = await this.userRepository.create({
      email: dto.email,
      passwordHash: hashed,
      name: dto.name,
      contactPhone: dto.contactPhone,
      role: dto.role,
    });

    return user;
  }
}
