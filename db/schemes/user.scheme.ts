import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RoleEnum } from '../enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  contactPhone: string;

  @Prop({
    type: String,
    enum: RoleEnum,
    required: false,
    default: RoleEnum.CLIENT,
  })
  role: RoleEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
