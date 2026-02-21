import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AuthorResponse {
  @ApiProperty({ description: 'ID пользователя сообщения.' })
  id: string;

  @ApiProperty({ description: 'Имя пользователя сообщения.' })
  name: string;
}

export class MessageResponse {
  @ApiProperty({ description: 'ID сообщения.' })
  id: string;

  @ApiProperty({ description: 'Дата создания сообщения.' })
  createdAt: Date;

  @ApiProperty({ description: 'Текст сообщения.' })
  text: string;

  @ApiProperty({ description: 'Дата прочтения сообщения.' })
  readAt: Date;

  @ApiProperty({ description: 'Автор сообщения.' })
  @Type(() => AuthorResponse)
  authorId: AuthorResponse;
}
