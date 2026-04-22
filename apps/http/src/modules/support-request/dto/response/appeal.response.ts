import { ApiProperty } from '@nestjs/swagger';

export class AppealClientResponse {
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
    description: 'ID пользователя, создавшего обращение.',
    format: 'objectId',
  })
  userId: string;

  @ApiProperty({ description: 'Дата создания обращения.' })
  createdAt: Date;

  @ApiProperty({ description: 'Флаг активности обращения.' })
  isActive: boolean;

  @ApiProperty({ description: 'Флаг есть ли новые сообщения.' })
  hasNewMessages: boolean;
}

export class AppealManagerResponse {
  @ApiProperty({ description: 'ID обращения.' })
  id: string;

  @ApiProperty({
    description: 'Данные пользователя, создавшего обращение.',
    type: AppealClientResponse,
  })
  client: AppealClientResponse;

  @ApiProperty({ description: 'Дата создания обращения.' })
  createdAt: Date;

  @ApiProperty({ description: 'Флаг активности обращения.' })
  isActive: boolean;

  @ApiProperty({ description: 'Флаг есть ли новые сообщения.' })
  hasNewMessages: boolean;
}
