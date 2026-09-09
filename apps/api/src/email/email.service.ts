import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

// Minimal shape of an Inquiry needed to compose these emails —
// intentionally not importing the Prisma-generated Inquiry type here.
export interface InquiryEmailData {
  id: string;
  productId: string;
  buyerName: string;
  buyerCompany?: string | null;
  buyerEmail: string;
  buyerPhone?: string | null;
  quantityRequested: number | { toString(): string };
  message?: string | null;
}

@Injectable()
export class EmailService {
  private readonly resend = new Resend(process.env.RESEND_API_KEY);
  private readonly fromAddress =
    process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  async sendOwnerNotification(inquiry: InquiryEmailData) {
    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
      throw new Error('OWNER_EMAIL is not set');
    }

    await this.resend.emails.send({
      from: this.fromAddress,
      to: ownerEmail,
      subject: `New inquiry from ${inquiry.buyerName}`,
      html: `
        <p>New RFQ received.</p>
        <ul>
          <li><strong>Product ID:</strong> ${inquiry.productId}</li>
          <li><strong>Buyer:</strong> ${inquiry.buyerName}${inquiry.buyerCompany ? ` (${inquiry.buyerCompany})` : ''}</li>
          <li><strong>Email:</strong> ${inquiry.buyerEmail}</li>
          <li><strong>Phone:</strong> ${inquiry.buyerPhone ?? 'N/A'}</li>
          <li><strong>Quantity requested:</strong> ${inquiry.quantityRequested}</li>
          <li><strong>Message:</strong> ${inquiry.message ?? 'N/A'}</li>
        </ul>
      `,
    });
  }

  async sendBuyerConfirmation(inquiry: InquiryEmailData) {
    await this.resend.emails.send({
      from: this.fromAddress,
      to: inquiry.buyerEmail,
      subject: 'We received your inquiry',
      html: `
        <p>Hi ${inquiry.buyerName},</p>
        <p>Thanks for your inquiry — we've received it and will get back to you shortly.</p>
      `,
    });
  }
}