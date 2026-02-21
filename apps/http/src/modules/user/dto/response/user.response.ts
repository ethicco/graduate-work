import { UserRoleEnum } from '@/db';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'ID пользователя.', format: 'objectId' })
  id: string;

  @ApiProperty({ description: 'Email пользователя.' })
  email: string;

  @ApiProperty({ description: 'Имя пользователя.' })
  name: string;

  @ApiProperty({ description: 'Номер телефона пользователя.' })
  contactPhone: string;

  @ApiProperty({ description: 'Роль пользователя.' })
  role: UserRoleEnum;
}
