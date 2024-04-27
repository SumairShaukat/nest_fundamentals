import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class pagiantionQueryDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsPositive()
  @IsOptional()
  offset: number;
}
