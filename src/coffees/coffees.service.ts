import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCoffeeDto } from './dto/create-coffee.dto.js';
import { UpdateCoffeeDto } from './dto/update-coffee.dto.js';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto.js';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.coffee.findMany({
      include: { flavors: true },
      orderBy: { id: 'asc' },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: {
        id: +id,
      },
      include: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    const { flavors, ...coffeeData } = createCoffeeDto;
    return this.prisma.coffee.create({
      data: {
        ...coffeeData,
        flavors: {
          connectOrCreate: this.connectOrCreateFlavors(flavors),
        },
      },
      include: { flavors: true },
    });
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    await this.findOne(id); // ให้ id ที่ไม่มีจริงได้ 404 แบบเดียวกัน
    const { flavors, ...coffeeData } = updateCoffeeDto;
    return this.prisma.coffee.update({
      where: { id: +id },
      data: {
        ...coffeeData,
        flavors: flavors && {
          set: [],
          connectOrCreate: this.connectOrCreateFlavors(flavors),
        },
      },
      include: { flavors: true },
    });
  }

  private connectOrCreateFlavors(names: string[]) {
    return names.map((name) => ({
      where: { name },
      create: { name },
    }));
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.coffee.delete({ where: { id: +id } });
  }
}
