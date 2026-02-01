import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HotelRoomService } from './hotel-room.service';
import {
  CreateHotelRoomRequest,
  HotelRoomResponse,
  UpdateHotelRoomRequest,
} from './dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { fileFilter, storage } from './utils';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@ApiTags('Комнаты отеля')
@Controller({ path: '/admin/hotel-rooms', version: '1' })
export class HotelRoomAdminController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @ApiOperation({
    description: 'Созднание комнаты отеля.',
    summary: 'Созднание комнаты отеля.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        hotelId: {
          description: 'ID отеля',
          type: 'string',
          format: 'objectId',
        },
        description: {
          type: 'string',
          description: 'Описание комнаты отеля',
        },
        images: {
          description: 'Изображения комнаты отеля',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: HotelRoomResponse })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'images',
          maxCount: 5,
        },
      ],
      {
        storage,
        limits: { fileSize: 1 * 1024 * 1024 },
        fileFilter,
      },
    ),
  )
  @Post('')
  create(
    @Body() dto: CreateHotelRoomRequest,
    @UploadedFiles() { images }: { images: Array<Express.Multer.File> },
  ): Promise<HotelRoomResponse> {
    return this.hotelRoomService.create(dto, images);
  }

  @ApiOperation({
    description: 'Обновление комнаты отеля.',
    summary: 'Обновление комнаты отеля.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Описание комнаты отеля',
        },
        isEnabled: {
          type: 'boolean',
          description: 'Флаг доступности комнаты отеля',
        },
        images: {
          description: 'Путь к изображению комнаты отеля',
          type: 'array',
          items: {
            type: 'string',
          },
        },
        files: {
          description: 'Изображения комнаты отеля',
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiOkResponse({ type: HotelRoomResponse })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'files',
          maxCount: 5,
        },
      ],
      {
        storage,
        limits: { fileSize: 1 * 1024 * 1024 },
        fileFilter,
      },
    ),
  )
  @Put(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateHotelRoomRequest,
    @UploadedFiles() { files }: { files: Array<Express.Multer.File> },
  ) {
    return this.hotelRoomService.update(id, dto, files);
  }
}
