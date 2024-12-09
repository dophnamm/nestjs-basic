import { v4 as uuidV4 } from 'uuid';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { UserDto } from 'src/users/dto/user.dto';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuidV4();
    },
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Object })
  createdBy: UserDto;

  @Prop({ type: Object, default: null })
  updatedBy: UserDto;

  @Prop({ type: Object, default: null })
  deletedBy: UserDto;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt: Date;

  @Prop()
  isDeleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
