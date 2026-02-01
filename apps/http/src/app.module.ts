import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '@/common/validator';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user';
import { HotelModule } from './modules/hotel';
import { HotelRoomModule } from './modules/hotel-room';
import { ReservationModule } from './modules/reservation';
import { SupportRequestModule } from './modules/support-request/support-request.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
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
