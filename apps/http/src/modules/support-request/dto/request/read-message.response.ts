import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ReadMessageRequest {
  @ApiProperty({ description: 'Метка о прочтении сообщения.' })
  @IsDateString({ strict: true, strictSeparator: true })
  createdBefore: Date;
}
