import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SupportRequestClient, SupportRequestService } from './services';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateSupportRequest,
  FindSupportRequest,
  MessageResponse,
  SendMessageRequest,
  SupportRequestResponse,
} from './dto';

@ApiTags('Чаты')
@Controller({ path: 'chats', version: '1' })
export class ChatController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClient,
  ) {}

  @ApiOperation({
    description: 'Создание чата поддержки.',
    summary: 'Создание чата поддержки.',
  })
  @ApiCreatedResponse({ type: SupportRequestResponse })
  @Post('')
  createChat(
    @Body() dto: CreateSupportRequest,
  ): Promise<SupportRequestResponse> {
    return this.supportRequestClientService.createSupportRequest(dto);
  }

  @ApiOperation({
    description: 'Получить список чатов.',
    summary: 'Получить список чатов.',
  })
  @ApiOkResponse({ type: SupportRequestResponse, isArray: true })
  @Get('')
  findChat(
    @Query() dto: FindSupportRequest,
  ): Promise<Array<SupportRequestResponse>> {
    return this.supportRequestService.findSupportRequests(dto);
  }

  @ApiOperation({
    description: 'Отправка сообщения в чат.',
    summary: 'Отправка сообщения в чат.',
  })
  @ApiCreatedResponse({ type: MessageResponse })
  @Post('send-message')
  sendMessage(@Body() dto: SendMessageRequest): Promise<MessageResponse> {
    return this.supportRequestService.sendMessage(dto);
  }
}
