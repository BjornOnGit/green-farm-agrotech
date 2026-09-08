import { Controller, Post, Get, Patch, Param, Body, Query } from '@nestjs/common';
import { InquiriesService } from './inquiries.service.js';
import type { InquiryStatus } from './inquiries.service.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';
import { UpdateInquiryDto } from './dto/update-inquiry.dto.js';

@Controller()
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @Post('inquiries')
  create(@Body() dto: CreateInquiryDto) {
    return this.inquiriesService.create(dto);
  }

  @Get('admin/inquiries')
  findAll(@Query('status') status?: InquiryStatus) {
    return this.inquiriesService.findAll(status);
  }

  @Patch('admin/inquiries/:id')
  update(@Param('id') id: string, @Body() dto: UpdateInquiryDto) {
    return this.inquiriesService.update(id, dto);
  }
}