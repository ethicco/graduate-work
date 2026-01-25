import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class HotelRoom {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Hotel' })
  hotelId: string;

  @Prop({ type: String, required: false })
  description: string;

  @Prop({ type: [String], required: false, default: [] })
  images: Array<string>;

  @Prop({ type: Boolean, required: true, default: true })
  isEnabled: boolean;

  createdAt: Date;

  updatedAt: Date;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
