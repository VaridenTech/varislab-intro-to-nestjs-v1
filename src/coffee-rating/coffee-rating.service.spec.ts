import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeRatingService } from './coffee-rating.service.js';
import { CoffeesService } from '../coffees/coffees.service.js';

describe('CoffeeRatingService', () => {
  let service: CoffeeRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeRatingService,
        { provide: CoffeesService, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeeRatingService>(CoffeeRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
