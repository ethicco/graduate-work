import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsMongoId } from 'class-validator';

export class HotelRoomListRequest {
  @ApiProperty({ description: 'ID отеля', type: String, format: 'objectId' })
  @IsMongoId()
  hotelId: string;

  @ApiProperty({ description: 'Кол-во записей', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  limit: number;

  @ApiProperty({ description: 'Номер', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  offset: number;
}
