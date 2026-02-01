import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({
  timestamps: {
    createdAt: 'sentAt',
    updatedAt: false,
  },
})
export class Message {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  authorId: string;

  sentAt: Date;

  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: Date, required: false })
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
