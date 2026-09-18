import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { Coffee, CoffeeSchema } from './entities/coffee.entity.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Coffee.name, schema: CoffeeSchema }]),
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule {}
