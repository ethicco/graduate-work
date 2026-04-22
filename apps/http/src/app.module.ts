import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@/common/validator';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './modules/user';
import { HotelModule } from './modules/hotel';
import { HotelRoomModule } from './modules/hotel-room';
import { ReservationModule } from './modules/reservation';
import { SupportRequestModule } from './modules/support-request/support-request.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
      serveRoot: '/resources/',
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false,
      },
    }),
    AuthModule,
    UserModule,
    HotelModule,
    HotelRoomModule,
    ReservationModule,
    SupportRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
