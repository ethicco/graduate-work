import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateHotelRequest,
  HotelResponse,
  HotelListRequest,
  UpdateHotelRequest,
} from './dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { AuthGuard, RolesGuard } from '@/common/guards';
import { UserRoleEnum } from '@/db';

@ApiTags('Отели')
@UseGuards(AuthGuard, RolesGuard([UserRoleEnum.ADMIN]))
@Controller({ path: '/admin/hotels', version: '1' })
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @ApiOperation({
    description: 'Создание отеля.',
    summary: 'Создание отеля.',
  })
  @ApiCreatedResponse({ type: HotelResponse })
  @Post('')
  create(@Body() dto: CreateHotelRequest): Promise<HotelResponse> {
    return this.hotelService.create(dto);
  }

  @ApiOperation({
    description: 'Получение списка отелей.',
    summary: 'Получение списка отелей.',
  })
  @ApiOkResponse({ type: HotelResponse, isArray: true })
  @Get('')
  getList(@Query() dto: HotelListRequest): Promise<Array<HotelResponse>> {
    return this.hotelService.search(dto);
  }

  @ApiOperation({
    description: 'Обновление отеля.',
    summary: 'Обновление отеля.',
  })
  @ApiOkResponse({ type: HotelResponse })
  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateHotelRequest,
  ) {
    return this.hotelService.update(id, dto);
  }
}
