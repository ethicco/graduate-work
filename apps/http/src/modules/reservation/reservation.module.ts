import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Module({
  imports: [DatabaseModule],
  providers: [ReservationService],
})
export class ReservationModule {}
