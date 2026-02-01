import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
