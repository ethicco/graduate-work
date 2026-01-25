import {
  HotelRoomRepository,
  IHotelRoom,
  IHotelRoomCreate,
  IHotelRoomUpdate,
  ISearchHotelRoomsParams,
} from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HotelRoomService {
  constructor(private readonly hotelRoomRepository: HotelRoomRepository) {}

  create(data: IHotelRoomCreate): Promise<IHotelRoom> {
    return this.hotelRoomRepository.create(data);
  }

  async findById(id: string): Promise<IHotelRoom> {
    const hotelRoom = await this.hotelRoomRepository.getById(id);

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return hotelRoom;
  }

  search(params: ISearchHotelRoomsParams): Promise<Array<IHotelRoom>> {
    return this.hotelRoomRepository.getList(params);
  }

  async update(id: string, data: IHotelRoomUpdate): Promise<IHotelRoom> {
    const hotelRoom = await this.hotelRoomRepository.update(id, data);

    if (!hotelRoom) {
      throw new NotFoundException('Hotel room not found');
    }

    return hotelRoom;
  }
}
