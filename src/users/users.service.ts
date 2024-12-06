import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private getHashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async create(createUserDto: UserDto): Promise<UserDto> {
    const hashPassword = this.getHashPassword(createUserDto.password);

    const response = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
    });

    return response;
  }

  async findAll(): Promise<UserDto[]> {
    const response = await this.userModel.find();

    return response;
  }

  async findOne(_id: string): Promise<UserDto> {
    const response = await this.userModel.findOne({ _id });

    return response;
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const response = await this.userModel.findOneAndUpdate(
      { _id },
      { ...updateUserDto, updatedAt: new Date() },
      { upsert: true, returnOriginal: false },
    );

    return response;
  }

  async remove(_id: string) {
    const response = await this.userModel.deleteOne({ _id });

    return response;
  }
}
