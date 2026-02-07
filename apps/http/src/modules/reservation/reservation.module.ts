import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationClientController } from './reservation-client.controller';
import { ReservationManagerController } from './reservation-manager.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationClientController, ReservationManagerController],
  providers: [ReservationService],
})
export class ReservationModule {}
