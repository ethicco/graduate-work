import {
  HotelRepository,
  IHotel,
  IHotelCreate,
  IHotelUpdate,
  ISearchHotelParams,
} from '@/db';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HotelService {
  constructor(private readonly hotelRepository: HotelRepository) {}

  create(data: IHotelCreate): Promise<IHotel> {
    return this.hotelRepository.create(data);
  }

  async findById(id: string): Promise<IHotel> {
    const hotel = await this.hotelRepository.getById(id);

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }

  search(params: ISearchHotelParams): Promise<Array<IHotel>> {
    return this.hotelRepository.getList(params);
  }

  async update(id: string, data: IHotelUpdate): Promise<IHotel> {
    const hotel = await this.hotelRepository.update(id, data);

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }
}
