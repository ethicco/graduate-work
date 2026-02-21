import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoleEnum } from '../enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  passwordHash?: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  contactPhone: string;

  @Prop({
    type: String,
    enum: UserRoleEnum,
    required: false,
    default: UserRoleEnum.CLIENT,
  })
  role: UserRoleEnum;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, req) {
    delete req.passwordHash;

    return req;
  },
});

export { UserSchema };
