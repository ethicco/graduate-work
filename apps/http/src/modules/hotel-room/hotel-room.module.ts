import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomCommonController } from './hotel-room-common.controller';
import { HotelRoomAdminController } from './hotel-room-admin.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelRoomAdminController, HotelRoomCommonController],
  providers: [HotelRoomService],
})
export class HotelRoomModule {}
