import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from './app.service';

import { Public } from './decorators/public.decorator';

@Public()
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
}
