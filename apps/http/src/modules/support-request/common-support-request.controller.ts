import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SupportRequestService } from './services';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from './dto/response/message.response';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { SendMessageRequest } from './dto';
import { User } from '@/common/decorators';
import { ReadMessageResponse } from './dto/response/read-message.response';
import { ReadMessageRequest } from './dto/request/read-message.response';

@ApiCookieAuth()
@ApiTags('Обращение в поддержку')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.CLIENT, UserRoleEnum.MANAGER]))
@Controller({ path: '/common/support-requests', version: '1' })
export class CommonSupportRequestController {
  constructor(private readonly supportRequestService: SupportRequestService) {}

  @ApiOperation({
    description: 'Получение истории сообщений из обращения в техподдержку.',
    summary: 'Получение истории сообщений из обращения в техподдержку.',
  })
  @ApiOkResponse({ type: MessageResponse, isArray: true })
  @Get('/:id/messages')
  getList(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Array<MessageResponse>> {
    return this.supportRequestService.getMessages(id);
  }

  @ApiOperation({
    description: 'Отправка сообщения.',
    summary: 'Отправка сообщения.',
  })
  @ApiCreatedResponse({ type: MessageResponse, isArray: true })
  @Post('/:id/messages')
  sendMessage(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: SendMessageRequest,
    @User() user: Express.User,
  ): Promise<Array<MessageResponse>> {
    return this.supportRequestService.sendMessage({
      supportRequestId: id,
      text: dto.text,
      authorId: user.id,
    });
  }

  @ApiOperation({
    description: 'Отправка события, что сообщения прочитаны.',
    summary: 'Отправка события, что сообщения прочитаны.',
  })
  @ApiCreatedResponse({ type: ReadMessageResponse })
  @Post('/:id/messages/read')
  readMessage(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: ReadMessageRequest,
    @User() user: Express.User,
  ): Promise<ReadMessageResponse> {
    return this.supportRequestService.readMessage(id, user, dto);
  }
}
