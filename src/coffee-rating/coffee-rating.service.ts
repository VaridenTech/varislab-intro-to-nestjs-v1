import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { CoffeesService } from '../coffees/coffees.service.js';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class CoffeeRatingService implements OnModuleInit {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject('CONNECTION') private readonly connection: PrismaClient,
  ) {}

  async onModuleInit() {
    console.log(await this.connection.$queryRaw`SELECT current_database()`);
  }
}
