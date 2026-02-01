import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class HotelListRequest {
  @ApiProperty({ description: 'Название отеля', type: String })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Кол-во записей', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  limit: number;

  @ApiProperty({ description: 'Номер страницы', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  offset: number;
}
