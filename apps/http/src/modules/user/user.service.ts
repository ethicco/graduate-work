import { ISearchUserParams, IUser, UserRepository } from '@/db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequest } from './dto';
import { CommonUtils } from '@/common/utils/common.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commonUtils: CommonUtils,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateUserRequest): Promise<Omit<IUser, 'passwordHash'>> {
    const user = await this.userRepository.getByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await this.commonUtils.generateHashPassword(
      dto.password,
      this.configService.get('PASSWORD_SALT', 'sault'),
    );

    const { id, email, name, contactPhone, role } =
      await this.userRepository.create({
        email: dto.email,
        name: dto.name,
        passwordHash: hashed,
        contactPhone: dto.contactPhone,
        role: dto.role,
      });

    return {
      id,
      email,
      name,
      contactPhone,
      role,
    };
  }

  async findById(id: string): Promise<IUser> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findAll(params: ISearchUserParams): Promise<Array<IUser>> {
    return this.userRepository.getList(params);
  }
}
