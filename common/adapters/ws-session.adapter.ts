import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions, Socket } from 'socket.io';
import { RequestHandler } from 'express';
import { NextFunction } from 'express-serve-static-core';

export class WebSocketSessionAdapter extends IoAdapter {
  private sessionMiddleware: RequestHandler;

  constructor(app: INestApplication, sessionMiddleware: RequestHandler) {
    super(app);
    this.sessionMiddleware = sessionMiddleware;
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    server.use((socket: Socket, next: NextFunction) => {
      //@ts-ignore
      this.sessionMiddleware(socket.request, {}, next);
    });

    server.use((socket, next) => {
      socket.request.res = {};
      socket.request._passportInstance.initialize()(socket.request, {}, next);
    });

    server.use((socket, next) => {
      socket.request.res = {};
      socket.request._passportInstance.session()(socket.request, {}, next);
    });

    return server;
  }
}
