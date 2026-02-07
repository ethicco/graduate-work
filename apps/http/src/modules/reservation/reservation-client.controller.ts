import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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

@ApiTags('Бронирования')
@Controller({ path: '/client/reservations', version: '1' })
export class ReservationClientController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    description: 'Создание брони.',
    summary: 'Создание брони.',
  })
  @ApiCreatedResponse({ type: ReservationResponse })
  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() dto: CreateReservationRequest,
  ) {
    return this.reservationService.addReservation(userId, dto);
  }

  @ApiOperation({
    description: 'Получить список броней текущего пользователя.',
    summary: 'Получить список броней текущего пользователя.',
  })
  @ApiOkResponse({ type: ReservationResponse })
  @Get(':userId')
  getList(
    @Param('userId') userId: string,
    @Query() dto: ReservationListRequest,
  ) {
    return this.reservationService.getReservations({ ...dto, userId });
  }

  @ApiOperation({
    description: 'Отмена бронирования пользователя.',
    summary: 'Отмена бронирования пользователя.',
  })
  @ApiNoContentResponse({ description: 'Бронь успешшно отменена' })
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string, userId: string) {
    return this.reservationService.removeReservation(userId, id);
  }
}
