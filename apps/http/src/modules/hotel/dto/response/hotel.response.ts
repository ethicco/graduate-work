import { IHotel } from '@/db';
import { ApiProperty } from '@nestjs/swagger';

export class HotelResponse implements IHotel {
  @ApiProperty({ description: 'ID отеля', type: String, format: 'objectId' })
  id: string;

  @ApiProperty({ description: 'Название отеля', type: String })
  title: string;

  @ApiProperty({ description: 'Описание отеля', type: String })
  description: string;

  @ApiProperty({ description: 'Дата создания записи', type: String })
  createdAt: Date;

  @ApiProperty({ description: 'Дата обновления записи', type: String })
  updatedAt: Date;
}
