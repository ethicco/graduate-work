import {
  IReservation,
  IReservationSearchOptions,
  ReservationRepository,
  HotelRoomRepository,
} from '@/db';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateReservationRequest } from './dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly hotelRoomRepository: HotelRoomRepository,
  ) {}

  async addReservation(
    userId: string,
    data: CreateReservationRequest,
  ): Promise<IReservation> {
    const hotelRoom = await this.hotelRoomRepository.getById(
      new Types.ObjectId(data.roomId),
    );

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return this.reservationRepository.create({
      ...data,
      userId,
      hotelId: hotelRoom.hotelId,
    });
  }

  async removeReservation(id: Types.ObjectId): Promise<void> {
    const reservation = await this.reservationRepository.deleteById(id);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
  }

  async removeClientReservation(
    userId: string,
    id: Types.ObjectId,
  ): Promise<void> {
    const reservation = await this.reservationRepository.getById(id);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.userId !== userId) {
      throw new ForbiddenException(
        'You do not have access to this reservation',
      );
    }

    await this.reservationRepository.deleteById(id);
  }

  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<IReservation>> {
    return this.reservationRepository.getList(filter);
  }
}
