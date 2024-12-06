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

import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
    return req.user;
  }
}
