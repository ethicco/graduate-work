import {
  IReservation,
  IReservationSearchOptions,
  ReservationRepository,
  HotelRoomRepository,
} from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const hotelRoom = await this.hotelRoomRepository.getById(data.roomId);

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return this.reservationRepository.create({
      ...data,
      userId,
      hotelId: hotelRoom.hotelId,
    });
  }

  async removeReservation(userId: string, id: string): Promise<void> {
    const reservation = await this.reservationRepository.deleteById(id);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    return;
  }

  getReservations(
    filter: IReservationSearchOptions,
  ): Promise<Array<IReservation>> {
    return this.reservationRepository.getList(filter);
  }
}
