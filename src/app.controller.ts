import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';

import {
  AuthenticatedRequest,
  AuthenticationPayload,
} from './auth/dto/auth.dto';

import { AuthService } from './auth/auth.service';

import { LocalAuthGuard } from './auth/guard/local-auth.guard';

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
  @Post('basic-login')
  basicLogin(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Request) {
    return this.authService.login(req.body as unknown as AuthenticationPayload);
  }
}
