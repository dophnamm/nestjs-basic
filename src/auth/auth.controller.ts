import { Controller, Request, UseGuards, Post } from '@nestjs/common';

import { LocalAuthGuard } from './guard/local-auth.guard';

import { AuthService } from './auth.service';

import { AuthenticatedRequest } from './dto/auth.dto';

import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
