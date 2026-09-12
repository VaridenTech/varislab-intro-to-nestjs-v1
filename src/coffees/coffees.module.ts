import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller.js';
import { CoffeesService } from './coffees.service.js';
import { COFFEE_BRANDS } from './coffees.constants.js';
import {
  AppConfigService,
  DevelopmentAppConfigService,
  ProductionAppConfigService,
} from './app-config.service.js';

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
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
