import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service.js';
import { CoffeesModule } from '../coffees/coffees.module.js';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
