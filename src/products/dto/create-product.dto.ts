import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsString()
  @IsNotEmpty()
  unit!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerUnit?: number;

  @IsNumber()
  @Min(0)
  quantityAvailable!: number;

  @IsOptional()
  @IsString()
  sourceLocation?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}