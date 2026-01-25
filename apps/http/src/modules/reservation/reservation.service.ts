import {
  IReservation,
  IReservationCreate,
  IReservationSearchOptions,
  ReservationRepository,
} from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  addReservation(data: IReservationCreate): Promise<IReservation> {
    return this.reservationRepository.create(data);
  }

  async removeReservation(id: string): Promise<void> {
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
