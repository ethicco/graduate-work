import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Hotel {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: false })
  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
