import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoffeesModule } from './coffees/coffees.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module.js';
import appConfig from './config/app.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3000),
      }),
      load: [appConfig],
    }),
    CoffeesModule,
    PrismaModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          forbidNonWhitelisted: true,
          transformOptions: {
            enableImplicitConversion: true,
          },
        }),
    },
  ],
})
export class AppModule {}
