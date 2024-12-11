import { UserDto } from 'src/users/dto/user.dto';

export class AuthenticationPayload {
  id: string;
  username: string;
  email: string;
}

export class AuthenticatedRequest extends Request {
  user: UserDto;
}
