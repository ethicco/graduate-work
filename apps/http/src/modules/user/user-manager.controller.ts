import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserResponse } from './dto';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import { UserListRequest } from './dto/request/user-list.request';

@ApiTags('Пользователи')
@ApiCookieAuth()
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.MANAGER]))
@Controller({ path: '/manager/users', version: '1' })
export class UserManagerController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Получение списка пользователей менеджером.',
    summary: 'Получение списка пользователей менеджером.',
  })
  @ApiOkResponse({ type: UserResponse, isArray: true })
  @Get('')
  getList(@Query() dto: UserListRequest): Promise<Array<UserResponse>> {
    return this.userService.findAll(dto);
  }
}
