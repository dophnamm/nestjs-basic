import { v4 as uuidV4 } from 'uuid';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidV4();
    },
  })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  age: number;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
