import { ISearchUserParams, IUser, IUserCreate, UserRepository } from '@/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(data: IUserCreate): Promise<IUser> {
    return this.userRepository.create(data);
  }

  findById(id: string): Promise<IUser | null> {
    return this.userRepository.getById(id);
  }

  findByEmail(email: string): Promise<IUser | null> {
    return this.userRepository.getByEmail(email);
  }

  findAll(params: ISearchUserParams): Promise<Array<IUser>> {
    return this.userRepository.getList(params);
  }
}
