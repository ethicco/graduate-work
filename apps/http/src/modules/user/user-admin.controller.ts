import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRequest, UserResponse } from './dto';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import { UserListRequest } from './dto/request/user-list.request';

@ApiTags('Пользователи')
@ApiCookieAuth()
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.ADMIN]))
@Controller({ path: '/admin/users', version: '1' })
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Создание пользоватея в системе администратором.',
    summary: 'Создание пользоватея в системе администратором.',
  })
  @ApiCreatedResponse({ type: UserResponse })
  @Post('')
  create(@Body() dto: CreateUserRequest): Promise<UserResponse> {
    return this.userService.create(dto);
  }

  @ApiOperation({
    description: 'Получение списка пользователей администратором.',
    summary: 'Получение списка пользователей администратором.',
  })
  @ApiOkResponse({ type: UserResponse, isArray: true })
  @Get('')
  getList(@Query() dto: UserListRequest): Promise<Array<UserResponse>> {
    return this.userService.findAll(dto);
  }
}
