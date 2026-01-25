import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IHotelRoom,
  IHotelRoomCreate,
  IHotelRoomUpdate,
  ISearchHotelRoomsParams as ISearchHotelRoomParams,
} from '../interfaces';
import { HotelRoom } from '../schemes';

@Injectable()
export class HotelRoomRepository {
  constructor(
    @InjectModel(HotelRoom.name)
    private readonly hotelRoomModel: Model<HotelRoom>,
  ) {}

  create(data: IHotelRoomCreate): Promise<IHotelRoom> {
    return this.hotelRoomModel.create(data);
  }

  update(id: string, data: IHotelRoomUpdate): Promise<IHotelRoom | null> {
    return this.hotelRoomModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: string): Promise<IHotelRoom | null> {
    return this.hotelRoomModel.findById(id).exec();
  }

  getList(params: ISearchHotelRoomParams): Promise<Array<IHotelRoom>> {
    const { hotelId, isEnabled, offset, limit } = params;

    return this.hotelRoomModel
      .find({
        hotelId,
        isEnabled,
      })
      .skip((offset - 1) * limit)
      .limit(limit)
      .exec();
  }

  deleteById(id: string): Promise<IHotelRoom | null> {
    return this.hotelRoomModel.findByIdAndDelete(id).exec();
  }
}
