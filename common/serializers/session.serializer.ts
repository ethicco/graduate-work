import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { DoneCallback } from 'passport';
import { Types } from 'mongoose';
import { UserRepository } from '@/db';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  serializeUser(user: Express.User, done: DoneCallback) {
    done(null, user.id as unknown as Express.User);
  }

  async deserializeUser(id: string, done: DoneCallback) {
    try {
      const user = await this.userRepository.getById(new Types.ObjectId(id));
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
