import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AppealResponse, FindAppealSupportRequest } from './dto';
import {
  EmployeeSupportRequestService,
  SupportRequestService,
} from './services';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import { User } from '@/common/decorators';
import {
  ApiCookieAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ApiCookieAuth()
@ApiTags('Обращение в поддержку')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.MANAGER]))
@Controller({ path: '/manager/support-requests', version: '1' })
export class ManagerSupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly employeeSupportRequestService: EmployeeSupportRequestService,
  ) {}

  @ApiOperation({
    description: 'Получение списка обращений в поддержку для менеджера.',
    summary: 'Получение списка обращений в поддержку для менеджера.',
  })
  @ApiOkResponse({ type: AppealResponse, isArray: true })
  @Get('')
  getList(
    @Query() dto: FindAppealSupportRequest,
    @User() user: Express.User,
  ): Promise<Array<AppealResponse>> {
    return this.supportRequestService.findSupportRequests(dto, user.id);
  }

  @ApiOperation({
    description: 'Закрытие обращения в поддержку.',
    summary: 'Закрытие обращения в поддержку.',
  })
  @ApiNoContentResponse()
  @HttpCode(204)
  @Patch('/:id/close')
  closeRequest(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<void> {
    return this.employeeSupportRequestService.closeRequest(id);
  }
}
