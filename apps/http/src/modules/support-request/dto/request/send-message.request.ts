import { ISendMessage } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class SendMessageRequest implements ISendMessage {
  @ApiProperty({
    description: 'ID чата',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  supportRequestId: string;

  @ApiProperty({
    description: 'ID Автора сообщения',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  authorId: string;

  @ApiProperty({ description: 'Сообщение пользователя', type: String })
  @IsString()
  text: string;
}
