import { IsEmail, IsInt, IsString } from 'class-validator';

export class UserDto {
  _id: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  age?: number;

  @IsInt()
  phoneNumber?: number;

  @IsString()
  address?: string;
}
