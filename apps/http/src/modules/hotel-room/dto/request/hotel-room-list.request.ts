import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsMongoId, IsOptional } from 'class-validator';

export class HotelRoomListRequest {
  @ApiPropertyOptional({
    description: 'ID отеля',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  @IsOptional()
  hotelId?: string;

  @ApiProperty({ description: 'Кол-во записей', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  limit: number;

  @ApiProperty({ description: 'Номер', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  offset: number;
}
