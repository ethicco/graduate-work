import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId } from 'class-validator';

export class CreateReservationRequest {
  @ApiProperty({
    description: 'ID комнаты отеля',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  roomId: string;

  @ApiProperty({ description: 'Дата заезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  dateStart: Date;

  @ApiProperty({ description: 'Дата выезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  dateEnd: Date;
}
