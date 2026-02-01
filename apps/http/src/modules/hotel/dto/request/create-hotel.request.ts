import { IHotelCreate } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHotelRequest implements IHotelCreate {
  @ApiProperty({ description: 'Название отеля', type: String })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Описание отеля', type: String })
  @IsString()
  description: string;
}
