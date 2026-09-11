'use client';

import { useState } from 'react';
import type { Inquiry } from '@/lib/types';
import { updateInquiryStatus } from '@/lib/actions';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const STATUSES = ['NEW', 'CONTACTED', 'QUOTED', 'CLOSED'] as const;

export function InquiryList({ inquiries }: { inquiries: Inquiry[] }) {
  const [statuses, setStatuses] = useState<Record<string, string>>(
    Object.fromEntries(inquiries.map((i) => [i.id, i.status])),
  );

  async function handleChange(id: string, status: string) {
    setStatuses((prev) => ({ ...prev, [id]: status }));
    await updateInquiryStatus(id, status);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Buyer</TableHead>
          <TableHead>Product ID</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inquiries.map((inquiry) => (
          <TableRow key={inquiry.id}>
            <TableCell className="font-medium">
              {inquiry.buyerName} <span className="text-muted-foreground">({inquiry.buyerEmail})</span>
            </TableCell>
            <TableCell className="text-muted-foreground">{inquiry.productId}</TableCell>
            <TableCell className="text-right">{inquiry.quantityRequested}</TableCell>
            <TableCell>
              <select
                className={cn(
                  'h-8 rounded-md border bg-transparent px-2 text-sm shadow-xs',
                  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none',
                )}
                value={statuses[inquiry.id]}
                onChange={(e) => handleChange(inquiry.id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </TableCell>
            <TableCell>{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}