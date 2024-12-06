import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('/health-check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('healthCheck')
  healthCheck() {
    const messages = this.appService.healthCheck();

    return {
      messages,
    };
  }
}
