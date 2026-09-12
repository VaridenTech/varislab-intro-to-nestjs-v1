import { DynamicModule, Module } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export interface DatabaseOptions {
  connectionString: string;
}

@Module({})
export class DatabaseModule {
  static register(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: new PrismaClient({ adapter: new PrismaPg(options) }),
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}
