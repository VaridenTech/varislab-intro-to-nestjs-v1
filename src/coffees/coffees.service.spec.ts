import type { Mock } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CoffeesService } from './coffees.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

type MockPrisma = {
  coffee: {
    findMany: Mock;
    findUnique: Mock;
    create: Mock;
  };
};
const createMockPrisma = (): MockPrisma => ({
  coffee: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
  },
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let prisma: MockPrisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: PrismaService, useValue: createMockPrisma() },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    prisma = module.get<MockPrisma>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        prisma.coffee.findUnique.mockReturnValue(expectedCoffee);
        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = '1';
        prisma.coffee.findUnique.mockReturnValue(null);

        try {
          await service.findOne(coffeeId);
          expect(false).toBeTruthy();
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect((err as Error).message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
