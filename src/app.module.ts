import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoffeesModule } from './coffees/coffees.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoffeesModule,
    PrismaModule,
    CoffeeRatingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
