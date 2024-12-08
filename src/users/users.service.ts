import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  private getHashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
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

  async findOneByEmail(email: string): Promise<UserDto> {
    const response = await this.userModel.findOne({ email });

    return response;
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const response = await this.userModel.findOneAndUpdate(
      { _id },
      updateUserDto,
      { upsert: true, returnOriginal: false },
    );

    return response;
  }

  async remove(_id: string) {
    const response = await this.userModel.softDelete({ _id });

    return response;
  }
}
