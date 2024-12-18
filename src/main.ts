import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppModule } from './app.module';

import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
