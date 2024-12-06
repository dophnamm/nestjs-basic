import { UserDto } from 'src/users/dto/user.dto';

export class AuthenticationPayload {
  username: string;
  password: string;
}

export class AuthenticatedRequest extends Request {
  user: UserDto;
}
