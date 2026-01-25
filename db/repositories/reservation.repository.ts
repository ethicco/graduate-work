import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import type {
  IReservation,
  IReservationCreate,
  IReservationSearchOptions,
  IReservationUpdate,
} from '../interfaces';
import { Reservation } from '../schemes';

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

    if (bookedRooms) {
      throw new Error('Room not available on selected dates');
    }

    return this.reservationModel.create(data);
  }

  update(id: string, data: IReservationUpdate): Promise<IReservation | null> {
    return this.reservationModel.findByIdAndUpdate(id, data).exec();
  }

  getById(id: string): Promise<IReservation | null> {
    return this.reservationModel.findById(id).exec();
  }

  getList(params: IReservationSearchOptions): Promise<Array<IReservation>> {
    const { userId, dateStart, dateEnd } = params;

    return this.reservationModel
      .find({
        userId,
        dateStart,
        dateEnd,
      })
      .exec();
  }

  deleteById(id: string): Promise<IReservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
