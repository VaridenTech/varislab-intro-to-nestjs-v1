import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

export interface DatabaseOptions {
  connectionString: string;
}

export interface DatabaseAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => DatabaseOptions | Promise<DatabaseOptions>;
  inject?: any[];
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

  static registerAsync(options: DatabaseAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: 'DATABASE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject ?? [],
        },
        {
          provide: 'CONNECTION',
          useFactory: (dbOptions: DatabaseOptions) =>
            new PrismaClient({ adapter: new PrismaPg(dbOptions) }),
          inject: ['DATABASE_OPTIONS'],
        },
      ],
      exports: ['CONNECTION'],
    };
  }
}
