import { adminFetch } from '@/lib/admin-api';
import { InquiryList } from '@/components/InquiryList';
import type { Inquiry } from '@/lib/types';

export default async function AdminInquiriesPage() {
  const inquiries: Inquiry[] = await adminFetch('/admin/inquiries');
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Inquiries</h1>
      <InquiryList inquiries={inquiries} />
    </div>
  );
}