import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IHotel,
  IHotelCreate,
  IHotelUpdate,
  ISearchHotelParams,
} from '../interfaces';
import { Hotel } from '../schemes';

@Injectable()
export class HotelRepository {
  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<Hotel>,
  ) {}

  create(data: IHotelCreate): Promise<IHotel> {
    return this.hotelModel.create(data);
  }

  update(id: Types.ObjectId, data: IHotelUpdate): Promise<IHotel | null> {
    return this.hotelModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: Types.ObjectId): Promise<IHotel | null> {
    return this.hotelModel.findById(id).exec();
  }

  getList(params: ISearchHotelParams): Promise<Array<IHotel>> {
    const { title, offset, limit } = params;

    return this.hotelModel
      .find({
        title: { $regex: title, $options: 'i' },
      })
      .skip((offset - 1) * limit)
      .limit(limit)
      .exec();
  }

  deleteById(id: Types.ObjectId): Promise<IHotel | null> {
    return this.hotelModel.findByIdAndDelete(id).exec();
  }
}
