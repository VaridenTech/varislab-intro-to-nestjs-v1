import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCoffeeDto } from './dto/create-coffee.dto.js';
import { UpdateCoffeeDto } from './dto/update-coffee.dto.js';

@Injectable()
export class CoffeesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.coffee.findMany();
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({ where: { id: +id } });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: CreateCoffeeDto) {
    return this.prisma.coffee.create({ data: createCoffeeDto });
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    await this.findOne(id); // ให้ id ที่ไม่มีจริงได้ 404 แบบเดียวกัน
    return this.prisma.coffee.update({
      where: { id: +id },
      data: updateCoffeeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.coffee.delete({ where: { id: +id } });
  }
}
