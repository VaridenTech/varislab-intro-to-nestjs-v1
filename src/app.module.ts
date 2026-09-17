import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoffeesController } from './coffees/coffees.controller.js';
import { CoffeesService } from './coffees/coffees.service.js';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
