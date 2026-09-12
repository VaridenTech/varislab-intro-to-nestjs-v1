import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { COFFEE_BRANDS } from './coffees.constants.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  AppConfigService,
  DevelopmentAppConfigService,
  ProductionAppConfigService,
} from './app-config.service.js';
import coffeesConfig from './coffees.config.js';

@Module({
  imports: [ConfigModule, ConfigModule.forFeature(coffeesConfig)],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (prisma: PrismaService): Promise<string[]> => {
        // ของจริง: const rows = await prisma.coffee.findMany({
        //   select: { brand: true }, distinct: ['brand'],
        // });
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [PrismaService],
    },
    {
      provide: AppConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentAppConfigService
          : ProductionAppConfigService,
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
