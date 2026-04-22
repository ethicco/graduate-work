import { UserRoleEnum } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsPhoneNumber, Length } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: 'Email пользователя.' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя.' })
  @Length(6, 255)
  password: string;

  @ApiProperty({ description: 'Имя пользователя.' })
  @Length(3, 255)
  name: string;

  @ApiProperty({ description: 'Номер телефона пользователя.' })
  @IsPhoneNumber()
  contactPhone: string;

  @ApiProperty({ description: 'Роль пользователя.' })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
