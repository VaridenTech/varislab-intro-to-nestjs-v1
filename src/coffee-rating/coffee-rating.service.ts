import { Injectable } from '@nestjs/common';
import { CoffeesService } from '../coffees/coffees.service.js';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
