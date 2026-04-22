export interface ISearchHotelRoomsParams {
  limit: number;
  offset: number;
  hotelId?: string;
  isEnabled?: boolean;
}

export interface IHotelRoom {
  id: string;
  hotelId: string;
  description: string;
  images: Array<string>;
  isEnabled: boolean;
}

export interface IHotelRoomCreate extends Omit<
  IHotelRoom,
  'id' | 'createdAt' | 'updatedAt' | 'isEnabled'
> {
  isEnabled?: boolean;
}

export interface IHotelRoomUpdate extends Partial<
  Omit<IHotelRoom, 'id' | 'createdAt' | 'updatedAt'>
> {}
