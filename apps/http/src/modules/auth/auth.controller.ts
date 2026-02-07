import { LocalAuthGuard } from '@/common/guards';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import type { Request } from 'express';
import { UserResponse } from './dto';

@ApiTags('Авторизация')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  @ApiOperation({
    summary: 'Авторизация пользователя.',
    description: 'Авторизация пользователя.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@mail.com' },
        password: { type: 'string', example: '123456' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiCookieAuth()
  @ApiOkResponse({ type: UserResponse })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): Promise<UserResponse> {
    return Promise.resolve({
      id: req.user?.id || '',
      email: req.user?.email || '',
      name: req.user?.name || '',
      contactPhone: req.user?.contactPhone || '',
    });
  }

  @ApiOperation({
    summary: 'Разлогирование пользователя.',
    description: 'Разлогирование пользователя.',
  })
  @ApiNoContentResponse({ description: 'Вы успешно разлогировались' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@Req() req: Request): Promise<void> {
    return Promise.resolve(req.logout(() => {}));
  }
}
