import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ClientSupportRequestService,
  EmployeeSupportRequestService,
  SupportRequestService,
} from './services';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { IMarkMessagesAsRead, UserRoleEnum } from '@/db';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MessageResponse } from './dto/response/message.response';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { SendMessageRequest } from './dto';
import { User } from '@/common/decorators';
import { ReadMessageRequest } from './dto/request/read-message.response';

@ApiCookieAuth()
@ApiTags('Обращение в поддержку')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.CLIENT, UserRoleEnum.MANAGER]))
@Controller({ path: '/common/support-requests', version: '1' })
export class CommonSupportRequestController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly clientSupportRequestService: ClientSupportRequestService,
    private readonly employeeSupportRequestService: EmployeeSupportRequestService,
  ) {}

  @ApiOperation({
    description: 'Получение истории сообщений из обращения в техподдержку.',
    summary: 'Получение истории сообщений из обращения в техподдержку.',
  })
  @ApiOkResponse({ type: MessageResponse, isArray: true })
  @Get('/:id/messages')
  getMessages(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
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
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
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
  @ApiNoContentResponse()
  @HttpCode(204)
  @Post('/:id/messages/read')
  async markMessagesAsRead(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() dto: ReadMessageRequest,
    @User() user: Express.User,
  ): Promise<void> {
    const params: IMarkMessagesAsRead = {
      userId: user.id,
      supportRequestId: id.toString(),
      createdBefore: dto.createdBefore,
    };

    if (user.role === UserRoleEnum.CLIENT) {
      await this.clientSupportRequestService.markMessagesAsRead(params);
    } else {
      await this.employeeSupportRequestService.markMessagesAsRead(params);
    }
  }
}
