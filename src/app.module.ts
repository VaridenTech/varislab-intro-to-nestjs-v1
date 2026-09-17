import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoffeesModule } from './coffees/coffees.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [CoffeesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
