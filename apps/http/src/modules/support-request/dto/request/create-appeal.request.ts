import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAppealRequest {
  @ApiProperty({ description: 'Ваше  сообщенее на обращение.' })
  @IsString()
  text: string;
}
