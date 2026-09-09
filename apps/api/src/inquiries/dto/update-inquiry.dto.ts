import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateInquiryDto {
  @IsOptional()
  @IsIn(['NEW', 'CONTACTED', 'QUOTED', 'CLOSED'])
  status?: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';

  @IsOptional()
  @IsString()
  internalNotes?: string;
}