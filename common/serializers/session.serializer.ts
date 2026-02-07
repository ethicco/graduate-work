import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { DoneCallback } from 'passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: Express.User, done: DoneCallback) {
    done(null, user);
  }

  deserializeUser(user: Express.User, done: DoneCallback) {
    done(null, user);
  }
}
