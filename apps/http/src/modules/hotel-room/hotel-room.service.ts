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

type HotelRoomPopulated = Omit<IHotelRoom, 'hotelId'> & {
  _id: Types.ObjectId;
  hotelId: {
    _id: Types.ObjectId;
    id?: string;
    title: string;
    description: string;
  };
};

@Injectable()
export class HotelRoomService {
  constructor(private readonly hotelRoomRepository: HotelRoomRepository) {}

  private toResponse(doc: HotelRoomPopulated): HotelRoomResponse {
    const hotel = doc.hotelId;
    return {
      id: doc.id ?? doc._id.toString(),
      description: doc.description,
      images: doc.images,
      hotel: {
        id: hotel?.id ?? hotel?._id.toString(),
        title: hotel?.title,
        description: hotel?.description,
      },
    };
  }

  async create(
    data: CreateHotelRoomRequest,
    images: Array<Express.Multer.File>,
  ): Promise<HotelRoomResponse> {
    const imagesUrls = images.map((img) => `${img.filename}`);

    const hotelRoom = await this.hotelRoomRepository.create({
      ...data,
      images: imagesUrls,
    });

    return this.toResponse(hotelRoom as unknown as HotelRoomPopulated);
  }

  async findById(id: Types.ObjectId): Promise<HotelRoomResponse> {
    const hotelRoom = await this.hotelRoomRepository.getById(id);

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return this.toResponse(hotelRoom as unknown as HotelRoomPopulated);
  }

  async search(
    params: ISearchHotelRoomsParams,
  ): Promise<Array<HotelRoomResponse>> {
    const hotelRooms = await this.hotelRoomRepository.getList(params);

    return hotelRooms.map((room) =>
      this.toResponse(room as unknown as HotelRoomPopulated),
    );
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
