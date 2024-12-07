import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';

import { AuthenticatedRequest } from './auth/dto/auth.dto';

import { AuthService } from './auth/auth.service';

import { LocalAuthGuard } from './auth/guard/local-auth.guard';

import { Public } from './decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get('/health-check')
  @Render('healthCheck')
  healthCheck() {
    const messages = this.appService.healthCheck();

    return {
      messages,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }
}
