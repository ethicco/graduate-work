import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationRequest,
  ReservationListRequest,
  ReservationResponse,
} from './dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';
import { User } from '@/common/decorators';

@ApiTags('Бронирования')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.CLIENT]))
@Controller({ path: '/client/reservations', version: '1' })
export class ReservationClientController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    description: 'Создание брони.',
    summary: 'Создание брони.',
  })
  @ApiCreatedResponse({ type: ReservationResponse })
  @Post('')
  create(@Body() dto: CreateReservationRequest, @User() user: Express.User) {
    return this.reservationService.addReservation(user.id, dto);
  }

  @ApiOperation({
    description: 'Получить список броней текущего пользователя.',
    summary: 'Получить список броней текущего пользователя.',
  })
  @ApiOkResponse({ type: ReservationResponse })
  @Get('')
  getList(@Query() dto: ReservationListRequest, @User() user: Express.User) {
    return this.reservationService.getReservations({ ...dto, userId: user.id });
  }

  @ApiOperation({
    description: 'Отмена бронирования пользователя.',
    summary: 'Отмена бронирования пользователя.',
  })
  @ApiNoContentResponse({ description: 'Бронь успешшно отменена' })
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, userId: string) {
    return this.reservationService.removeReservation(userId, id);
  }
}
