import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationListRequest, ReservationResponse } from './dto';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';

@ApiTags('Бронирования')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.MANAGER]))
@Controller({ path: '/manager/reservations', version: '1' })
export class ReservationManagerController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({
    description: 'Получить список броней конкретного пользователя.',
    summary: 'Получить список броней конкретного пользователя.',
  })
  @ApiOkResponse({ type: ReservationResponse })
  @Get('')
  getList(@Query() dto: ReservationListRequest) {
    return this.reservationService.getReservations(dto);
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
