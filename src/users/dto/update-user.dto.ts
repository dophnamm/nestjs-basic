import { Prop } from '@nestjs/mongoose';
import { PartialType, OmitType } from '@nestjs/mapped-types';

import { UserDto } from './user.dto';

export class UpdateUserDto extends OmitType(PartialType(UserDto), [
  'password',
] as const) {
  @Prop({ type: Date })
  updatedAt: Date;
}
