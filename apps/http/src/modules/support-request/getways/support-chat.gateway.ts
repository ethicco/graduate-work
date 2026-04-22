import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SupportRequestService } from '../services';
import { UseGuards } from '@nestjs/common';
import { ChatAccessGuard, WsAuthGuard } from '../guards';

@WebSocketGateway(9001, { cors: true, namespace: '/support-request' })
export class SupportChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly events: SupportRequestService) {}

  @UseGuards(WsAuthGuard, ChatAccessGuard)
  @SubscribeMessage('subscribeToChat')
  async handleSubscribeMessage(
    @MessageBody() payload: { chatId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId } = payload;

    await client.join(`chat_${chatId}`);

    const unsubscribe = this.events.subscribe((supportRequest, message) => {
      if (supportRequest.id !== chatId) return;

      client.emit('newMessage', {
        id: message.id,
        text: message.text,
        sentAt: message.sentAt,
        readAt: message.readAt,
        authorId: message.authorId,
      });
    });

    client.on('disconnect', () => unsubscribe());

    return { status: 'subscribed', chatId };
  }
}
