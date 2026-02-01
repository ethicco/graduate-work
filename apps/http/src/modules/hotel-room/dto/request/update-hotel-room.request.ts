import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateHotelRoomRequest {
  @ApiPropertyOptional({
    description: 'Описание комнаты',
    type: String,
    format: 'objectId',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Флаг доступности комнаты',
    type: Boolean,
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @ApiPropertyOptional({
    description: 'Пути к уже загруженным файлам',
    type: Boolean,
  })
  @Transform(({ value }) => (!Array.isArray(value) ? [value] : value))
  @IsString({ each: true })
  @IsOptional()
  images: Array<string>;
}
