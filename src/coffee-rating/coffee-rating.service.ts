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
    // ตั้งแต่บทที่ 42 ลบ 'dotenv/config' ออกจาก main.ts แล้ว DatabaseModule.register()
    // (บทที่ 39) อ่าน process.env.DATABASE_URL ก่อน ConfigModule.forRoot() จะโหลด .env
    // เสร็จ ทำให้ connectionString เป็น undefined ตามที่บทที่ 42 เตือนไว้ — ห่อด้วย
    // try/catch กันไม่ให้ error ตรงนี้ทำทั้งแอปพัง จนกว่าบทที่ 48 จะแก้ด้วย registerAsync
    try {
      console.log(await this.connection.$queryRaw`SELECT current_database()`);
    } catch (err) {
      console.warn('CONNECTION demo unavailable (expected until lesson 48):', (err as Error).message);
    }
  }
}
