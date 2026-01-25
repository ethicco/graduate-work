import { DatabaseModule } from '@/db';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Module({
  imports: [DatabaseModule],
  providers: [HotelService],
})
export class HotelModule {}
