import { UserDto } from 'src/users/dto/user.dto';

export interface AuthenticatedRequest extends Request {
  user: UserDto;
}
