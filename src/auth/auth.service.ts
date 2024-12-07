import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from 'src/users/dto/user.dto';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (user) {
      const validPassword = await this.usersService.checkPassword(
        password,
        user.password,
      );

      if (validPassword) return user;
    }

    return null;
  }

  async login(user: UserDto) {
    const payload = {
      _id: user._id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
