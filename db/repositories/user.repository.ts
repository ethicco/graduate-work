import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  ISearchUserParams,
  IUser,
  IUserCreate,
  IUSerUpdate,
} from '../interfaces';
import { User } from '../schemes';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(data: IUserCreate): Promise<IUser> {
    return this.userModel.create(data);
  }

  update(id: Types.ObjectId, data: IUSerUpdate): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: Types.ObjectId): Promise<IUser | null> {
    return this.userModel.findById(id).exec();
  }

  getByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).select('+passwordHash').exec();
  }

  getList(params: ISearchUserParams): Promise<Array<IUser>> {
    const { email, name, contactPhone, offset, limit } = params;

    return this.userModel
      .find({
        email: { $regex: email || '', $options: 'i' },
        name: { $regex: name || '', $options: 'i' },
        contactPhone: { $regex: contactPhone || '', $options: 'i' },
      })
      .skip((offset - 1) * limit)
      .limit(limit)
      .exec();
  }

  deleteById(id: Types.ObjectId): Promise<IUser | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
