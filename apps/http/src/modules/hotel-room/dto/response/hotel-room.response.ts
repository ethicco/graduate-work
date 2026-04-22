import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class HotelResponse {
  @ApiProperty({ description: 'ID отеля', type: String })
  id: string;

  @ApiProperty({ description: 'Название отеля', type: String })
  title: string;

  @ApiProperty({ description: 'Описание отеля', type: String })
  description: string;
}

export class HotelRoomResponse {
  @ApiProperty({ description: 'ID комнаты', type: String })
  id: string;

  @ApiProperty({ description: 'Описание комнаты', type: String })
  description: string;

  @ApiProperty({
    description: 'Изображения комнаты',
    type: String,
    isArray: true,
  })
  images: Array<string>;

  @ApiProperty({ description: 'Информация об отеле', type: HotelResponse })
  @Type(() => HotelResponse)
  hotel: HotelResponse;
}
