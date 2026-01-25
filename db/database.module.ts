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
} from './schemes';
import {
  HotelRepository,
  HotelRoomRepository,
  UserRepository,
} from './repositories';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Hotel.name, schema: HotelSchema },
      { name: HotelRoom.name, schema: HotelRoomSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [UserRepository, HotelRepository, HotelRoomRepository],
  exports: [UserRepository, HotelRepository, HotelRoomRepository],
})
export class DatabaseModule {}
