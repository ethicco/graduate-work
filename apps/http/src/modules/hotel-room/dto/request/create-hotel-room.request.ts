import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateHotelRoomRequest {
  @ApiProperty({
    description: 'Описание комнаты',
    type: String,
    format: 'objectId',
  })
  @IsString()
  description: string;

  @ApiProperty({ description: 'ID отеля', type: String, format: 'objectId' })
  @IsMongoId()
  hotelId: string;
}
