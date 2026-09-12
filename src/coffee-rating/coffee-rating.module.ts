import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service.js';
import { CoffeesModule } from '../coffees/coffees.module.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      connectionString: process.env.DATABASE_URL!, // ! กัน strict mode ชั่วคราว — บทที่ 48 เปลี่ยนเป็น getOrThrow
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
