import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';

@Module({
  imports: [DatabaseModule],
  providers: [HotelRoomService],
})
export class HotelRoomModule {}
