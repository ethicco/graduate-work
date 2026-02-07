import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'ID пользователя.' })
  id: string;

  @ApiProperty({ description: 'Email пользователя.' })
  email: string;

  @ApiProperty({ description: 'Имя пользователя.' })
  name: string;

  @ApiProperty({ description: 'Номер телефона пользователя.' })
  contactPhone: string;
}
