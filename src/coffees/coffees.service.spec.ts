import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
