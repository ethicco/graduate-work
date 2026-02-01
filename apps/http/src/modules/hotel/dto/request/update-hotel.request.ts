import { IHotelUpdate } from '@/db';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelRequest implements IHotelUpdate {
  @ApiPropertyOptional({ description: 'Название отеля', type: String })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Описание отеля', type: String })
  @IsString()
  @IsOptional()
  description?: string;
}
