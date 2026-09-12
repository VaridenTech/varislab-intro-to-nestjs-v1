import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @Min(0) // 👈 ไม่ใช่ @IsPositive() — offset=0 (เริ่มจากแถวแรก) เป็นค่าที่ถูกต้องและใช้บ่อยที่สุด
  offset: number;
}
