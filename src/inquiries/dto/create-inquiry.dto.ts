import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  buyerName!: string;

  @IsOptional()
  @IsString()
  buyerCompany?: string;

  @IsEmail()
  buyerEmail!: string;

  @IsOptional()
  @IsString()
  buyerPhone?: string;

  @IsNumber()
  @Min(0)
  quantityRequested!: number;

  @IsOptional()
  @IsString()
  message?: string;
}