import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message, MessageSchema } from './message.scheme';

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class SupportRequest {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId: string;

  createdAt: Date;

  @Prop({ type: [MessageSchema], required: false })
  messages: Array<Message>;

  @Prop({ type: Boolean, required: false })
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
