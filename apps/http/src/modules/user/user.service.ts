import { ISearchUserParams, IUser, IUserCreate, UserRepository } from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(data: IUserCreate): Promise<IUser> {
    return this.userRepository.create(data);
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
