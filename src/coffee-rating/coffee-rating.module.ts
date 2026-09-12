import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoffeeRatingService } from './coffee-rating.service.js';
import { CoffeesModule } from '../coffees/coffees.module.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connectionString: configService.getOrThrow<string>('DATABASE_URL'),
      }),
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
