import { ApiProperty } from '@nestjs/swagger';
import { HotelResponse } from '../../../hotel/dto';
import { HotelRoomResponse } from '../../../hotel-room/dto';

export class ReservationResponse {
  @ApiProperty({
    description: 'ID броонирования',
    type: String,
    format: 'objectId',
  })
  id: string;

  @ApiProperty({
    description: 'ID Пользователя броонирования',
    type: String,
    format: 'objectId',
  })
  userId: string;

  @ApiProperty({ description: 'Информация об отеле', type: HotelResponse })
  hotel: HotelResponse;

  @ApiProperty({
    description: 'Информация об комнате отеля',
    type: HotelRoomResponse,
  })
  room: HotelRoomResponse;

  @ApiProperty({
    description: 'Дата заезда',
    type: String,
    format: 'objectId',
  })
  dateStart: Date;

  @ApiProperty({
    description: 'Дата выезда',
    type: String,
    format: 'objectId',
  })
  dateEnd: Date;
}
