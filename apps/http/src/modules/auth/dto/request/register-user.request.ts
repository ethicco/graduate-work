import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, Length } from 'class-validator';

export class RegisterUserRequest {
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
}
