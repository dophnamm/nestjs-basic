import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
