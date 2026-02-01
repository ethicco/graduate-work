import { HotelRoomRepository, IHotelRoom, ISearchHotelRoomsParams } from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateHotelRoomRequest,
  HotelRoomResponse,
  UpdateHotelRoomRequest,
} from './dto';

@Injectable()
export class HotelRoomService {
  constructor(private readonly hotelRoomRepository: HotelRoomRepository) {}

  create(
    data: CreateHotelRoomRequest,
    images: Array<Express.Multer.File>,
  ): Promise<HotelRoomResponse> {
    const imagesUrls = images.map((img) => `${img.fieldname}/${img.filename}`);

    return this.hotelRoomRepository.create({
      ...data,
      images: imagesUrls,
    }) as unknown as Promise<HotelRoomResponse>;
  }

  async findById(id: string): Promise<HotelRoomResponse> {
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
    id: string,
    data: UpdateHotelRoomRequest,
    files: Array<Express.Multer.File>,
  ): Promise<IHotelRoom> {
    const images = [
      ...data.images,
      ...files.map((file) => `${file.fieldname}/${file.filename}`),
    ];

    const hotelRoom = await this.hotelRoomRepository.update(id, {
      ...data,
      images,
    });

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return hotelRoom;
  }
}
