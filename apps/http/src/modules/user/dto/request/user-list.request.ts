import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  Length,
} from 'class-validator';

export class UserListRequest {
  @ApiProperty({ description: 'Кол-во записей', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  limit: number;

  @ApiProperty({ description: 'Номер страницы', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  offset: number;

  @ApiPropertyOptional({ description: 'Имя пользователя.' })
  @Length(1, 255)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Email пользователя.' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Номер телефона пользователя.' })
  @IsPhoneNumber()
  @IsOptional()
  contactPhone?: string;
}
