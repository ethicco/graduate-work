import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationListRequest, ReservationResponse } from './dto';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@ApiTags('Бронирования')
@Controller({ path: '/manager/reservations', version: '1' })
export class ReservationManagerController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    description: 'Получить список броней конкретного пользователя.',
    summary: 'Получить список броней конкретного пользователя.',
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
    description: 'Отмена бронирования менеджером.',
    summary: 'Отмена бронирования менеджером.',
  })
  @ApiNoContentResponse({ description: 'Бронь успешшно отменена' })
  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string, userId: string) {
    return this.reservationService.removeReservation(userId, id);
  }
}
