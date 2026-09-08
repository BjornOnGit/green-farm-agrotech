import { Module } from '@nestjs/common';
import { InquiriesController } from './inquiries.controller.js';
import { InquiriesService } from './inquiries.service.js';
import { EmailModule } from '../email/email.module.js';

@Module({
  imports: [EmailModule],
  controllers: [InquiriesController],
  providers: [InquiriesService]
})
export class InquiriesModule {}