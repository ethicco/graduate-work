import { IMessage, ISupportRequest } from '@/db';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MessageResponse implements IMessage {
  @ApiProperty({
    description: 'Автор сообщения',
    type: String,
    format: 'objectId',
  })
  authorId: string;

  @ApiProperty({ description: 'Дата отправки сообщения', type: Date })
  sentAt: Date;

  @ApiProperty({ description: 'Текст сообщения', type: String })
  text: string;

  @ApiPropertyOptional({ description: 'Дата прочтения сообщения', type: Date })
  readAt?: Date;
}

export class SupportRequestResponse implements ISupportRequest {
  @ApiProperty({ description: 'ID чата', type: String })
  id: string;

  @ApiProperty({
    description: 'ID пользователя чата',
    type: String,
    format: 'objectId',
  })
  userId: string;

  @ApiProperty({ description: 'Дата создания чата', type: Date })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Сообщения чата',
    type: MessageResponse,
    isArray: true,
  })
  @Type(() => MessageResponse)
  messages?: IMessage[];

  @ApiPropertyOptional({ description: 'Флаг активности чата', type: Boolean })
  isActive?: boolean;
}
