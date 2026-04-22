import fs from 'node:fs/promises';
import path from 'node:path';
import { HotelRoomRepository, IHotelRoom, ISearchHotelRoomsParams } from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import {
  CreateHotelRoomRequest,
  HotelRoomResponse,
  UpdateHotelRoomRequest,
} from './dto';
import { UPLOADS_DIR } from './utils';

@Injectable()
export class HotelRoomService {
  constructor(private readonly hotelRoomRepository: HotelRoomRepository) {}

  create(
    data: CreateHotelRoomRequest,
    images: Array<Express.Multer.File>,
  ): Promise<HotelRoomResponse> {
    const imagesUrls = images.map((img) => `${img.filename}`);

    return this.hotelRoomRepository.create({
      ...data,
      images: imagesUrls,
    }) as unknown as Promise<HotelRoomResponse>;
  }

  async findById(id: Types.ObjectId): Promise<HotelRoomResponse> {
    const hotelRoom = await this.hotelRoomRepository.getById(id);

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return hotelRoom as unknown as HotelRoomResponse;
  }

  search(params: ISearchHotelRoomsParams): Promise<Array<HotelRoomResponse>> {
    return this.hotelRoomRepository.getList(params) as unknown as Promise<
      Array<HotelRoomResponse>
    >;
  }

  async update(
    id: Types.ObjectId,
    data: UpdateHotelRoomRequest,
    files: Array<Express.Multer.File>,
  ): Promise<IHotelRoom> {
    const hotelRoom = await this.hotelRoomRepository.getById(id);

    const deleteImages =
      hotelRoom?.images.filter((img) => !data.images.includes(img)) || [];

    try {
      await Promise.all(
        deleteImages?.map((img) => fs.unlink(path.join(UPLOADS_DIR, img))),
      );
      console.log('Файлы удалёны');
    } catch (err) {
      console.error('Ошибка удаления', err);
    }

    const images = [...data.images, ...files.map((file) => `${file.filename}`)];

    const hotelRoomUpdated = await this.hotelRoomRepository.update(id, {
      ...data,
      images,
    });

    if (!hotelRoomUpdated) {
      throw new NotFoundException('Hotel room not found');
    }

    return hotelRoomUpdated;
  }
}
