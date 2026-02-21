import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  AppealResponse,
  CreateAppealRequest,
  FindAppealSupportRequest,
} from './dto';
import { ClientSupportRequestService, SupportRequestService } from './services';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import { User } from '@/common/decorators';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiCookieAuth()
@ApiTags('Обращение в поддержку')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.CLIENT]))
@Controller({ path: '/client/support-requests', version: '1' })
export class ClientSupportRequestController {
  constructor(
    private readonly clientSupportRequestService: ClientSupportRequestService,
    private readonly supportRequestService: SupportRequestService,
  ) {}

  @ApiOperation({
    description: 'Создание обращения в поддержку.',
    summary: 'Создание обращения в поддержку.',
  })
  @ApiCreatedResponse({ type: AppealResponse })
  @Post('')
  create(
    @Body() dto: CreateAppealRequest,
    @User() user: Express.User,
  ): Promise<AppealResponse> {
    return this.clientSupportRequestService.createSupportRequest({
      text: dto.text,
      userId: user.id,
    });
  }

  @ApiOperation({
    description: 'Получение списка обращений в поддержку.',
    summary: 'Получение списка обращений в поддержку.',
  })
  @ApiOkResponse({ type: AppealResponse, isArray: true })
  @Get('')
  getList(
    @Query() dto: FindAppealSupportRequest,
    @User() user: Express.User,
  ): Promise<Array<AppealResponse>> {
    return this.supportRequestService.findAppealSupportRequests(dto, user.id);
  }
}
