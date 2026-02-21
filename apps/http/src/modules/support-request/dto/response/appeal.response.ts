import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class AppealUserResponse {
  @ApiProperty({ description: 'ID пользователя.', format: 'objectId' })
  id: string;

  @ApiProperty({ description: 'Email пользователя.' })
  email: string;

  @ApiProperty({ description: 'Имя пользователя.' })
  name: string;

  @ApiProperty({ description: 'Номер телефона пользователя.' })
  contactPhone: string;
}

export class AppealResponse {
  @ApiProperty({ description: 'ID обращения.' })
  id: string;

  @ApiProperty({
    description: 'ID пользоватея созданого обращения.',
    type: AppealUserResponse,
  })
  @Type(() => AppealUserResponse)
  userId: string | AppealUserResponse;

  @ApiProperty({ description: 'Дата создания обращения.' })
  createdAt: Date;

  @ApiProperty({ description: 'Флаг активности обращения.' })
  isActive: boolean;

  @ApiProperty({ description: 'Флаг есть ли новые сообщения.' })
  hasNewMessages: boolean;
}
