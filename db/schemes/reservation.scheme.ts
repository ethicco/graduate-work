import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Reservation {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Hotel' })
  hotelId: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'HotelRoom' })
  roomId: string;

  @Prop({ type: Date, required: true })
  dateStart: Date;

  @Prop({ type: Date, required: true })
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
