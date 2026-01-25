export interface IReservationSearchOptions {
  userId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface IReservation {
  id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface IReservationCreate extends Omit<IReservation, 'id'> {}

export interface IReservationUpdate extends Partial<Omit<IReservation, 'id'>> {}
