import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IReservation,
  IReservationCreate,
  IReservationSearchOptions,
  IReservationUpdate,
} from '../interfaces';
import { Reservation } from '../schemes';
import { cleanFilter } from '../utils';

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
  ) {}

  async create(data: IReservationCreate): Promise<IReservation> {
    const bookedRooms = await this.reservationModel.find({
      roomId: data.roomId,
      $or: [
        { dateFrom: { $lte: data.dateEnd }, dateTo: { $gte: data.dateStart } },
      ],
    });

    if (bookedRooms.length) {
      throw new Error('Room not available on selected dates');
    }

    const reservation = await this.reservationModel.create(data);

    return reservation.populate(['hotelId', 'roomId']);
  }

  update(
    id: Types.ObjectId,
    data: IReservationUpdate,
  ): Promise<IReservation | null> {
    return this.reservationModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: Types.ObjectId): Promise<IReservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  getList(params: IReservationSearchOptions): Promise<Array<IReservation>> {
    return this.reservationModel
      .find(cleanFilter(params))
      .populate(['hotelId', 'roomId'])
      .exec();
  }

  deleteById(id: Types.ObjectId): Promise<IReservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
