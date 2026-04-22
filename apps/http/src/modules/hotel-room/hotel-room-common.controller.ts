import { Controller, Get, Param, Query } from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import { HotelRoomListRequest } from './dto/request';
import { HotelRoomResponse } from './dto';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@ApiTags('Комнаты отеля')
@ApiCookieAuth()
@Controller({ path: '/common/hotel-rooms', version: '1' })
export class HotelRoomCommonController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @ApiOperation({
    description: 'Поиск номеров.',
    summary: 'Поиск номеров.',
  })
  @ApiOkResponse({ type: HotelRoomResponse, isArray: true })
  @Get('')
  search(
    @Query() dto: HotelRoomListRequest,
  ): Promise<Array<HotelRoomResponse>> {
    return this.hotelRoomService.search({ ...dto, isEnabled: true });
  }

  @ApiOperation({
    description: 'Получение номера по ID.',
    summary: 'Получение номера по ID.',
  })
  @ApiOkResponse({ type: HotelRoomResponse })
  @Get(':id')
  getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<HotelRoomResponse> {
    return this.hotelRoomService.findById(id);
  }
}
