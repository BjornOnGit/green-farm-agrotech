import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmailService } from '../email/email.service.js';
import { CreateInquiryDto } from './dto/create-inquiry.dto.js';
import { UpdateInquiryDto } from './dto/update-inquiry.dto.js';

export type InquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateInquiryDto) {
    const inquiry = await this.prisma.inquiry.create({
      data: { ...dto, status: 'NEW' },
    });

    try {
      await this.emailService.sendOwnerNotification(inquiry);
      await this.emailService.sendBuyerConfirmation(inquiry);
    } catch (err) {
      this.logger.error('Failed to send inquiry notification email(s)', err);
    }

    return inquiry;
  }

  findAll(status?: InquiryStatus) {
    return this.prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateInquiryDto) {
    const existing = await this.prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Inquiry ${id} not found`);
    }
    return this.prisma.inquiry.update({ where: { id }, data: dto });
  }
}