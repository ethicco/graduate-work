export interface ISearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

export interface IHotel {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IHotelCreate extends Omit<
  IHotel,
  'id' | 'createdAt' | 'updatedAt'
> {}

export interface IHotelUpdate extends Partial<
  Omit<IHotel, 'id' | 'createdAt' | 'updatedAt'>
> {}
