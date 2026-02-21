import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendMessageRequest {
  @ApiProperty({ description: 'Сообщение пользователя', type: String })
  @IsString()
  text: string;
}
