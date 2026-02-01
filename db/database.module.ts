import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  User,
  UserSchema,
  Hotel,
  HotelSchema,
  HotelRoom,
  HotelRoomSchema,
  Reservation,
  ReservationSchema,
  SupportRequest,
  SupportRequestSchema,
} from './schemes';
import {
  HotelRepository,
  HotelRoomRepository,
  ReservationRepository,
  SupportRequestRepository,
  UserRepository,
} from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Reservation.name, schema: ReservationSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [
    UserRepository,
    HotelRepository,
    HotelRoomRepository,
    ReservationRepository,
    SupportRequestRepository,
  ],
  exports: [
    UserRepository,
    HotelRepository,
    HotelRoomRepository,
    ReservationRepository,
    SupportRequestRepository,
  ],
})
export class DatabaseModule {}
