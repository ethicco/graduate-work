import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class ReservationListRequest {
  @ApiPropertyOptional({ description: 'Дата заезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  @IsOptional()
  dateStart: Date;

  @ApiPropertyOptional({ description: 'Дата выезда', type: Date })
  @IsDateString({ strict: true, strictSeparator: true })
  @IsOptional()
  dateEnd: Date;
}
