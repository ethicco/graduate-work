import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserRequest, UserResponse } from './dto';
import { UserRoleEnum } from '@/db';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller({ path: '/client', version: '1' })
export class AuthClientController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: 'Регистрация пользователя с ролью клиент.',
    summary: 'Регистрация пользователя с ролью клиент.',
  })
  @ApiCreatedResponse({ type: UserResponse })
  @Post('register')
  register(@Body() dto: RegisterUserRequest): Promise<UserResponse> {
    return this.authService.register({ ...dto, role: UserRoleEnum.CLIENT });
  }
}
