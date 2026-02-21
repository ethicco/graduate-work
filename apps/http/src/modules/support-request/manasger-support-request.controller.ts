import { Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppealResponse, FindAppealSupportRequest } from './dto';
import { SupportRequestService } from './services';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('Обращение в поддержку')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.MANAGER]))
@Controller({ path: '/manager/support-requests', version: '1' })
export class ManagerSupportRequestController {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @ApiOperation({
    description: 'Получение списка обращений в поддержку для менеджера.',
    summary: 'Получение списка обращений в поддержку для менеджера.',
  })
  @ApiOkResponse({ type: AppealResponse, isArray: true })
  @Get('')
  getList(
    @Query() dto: FindAppealSupportRequest,
  ): Promise<Array<AppealResponse>> {
    return this.supportRequestService.findAppealSupportRequests(dto);
  }
}
