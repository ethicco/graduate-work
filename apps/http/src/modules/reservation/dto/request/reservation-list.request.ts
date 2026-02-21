import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional } from 'class-validator';

export class ReservationListRequest {
  @ApiProperty({
    description: 'ID пользователя.',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  @IsOptional()
  userId?: string;

  @ApiPropertyOptional({ description: 'Дата заезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  @IsOptional()
  dateStart: Date;

  @ApiPropertyOptional({ description: 'Дата выезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  @IsOptional()
  dateEnd: Date;
}
