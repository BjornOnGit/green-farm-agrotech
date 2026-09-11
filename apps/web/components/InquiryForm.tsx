'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { submitInquiry } from '@/lib/api-client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface InquiryFormValues {
  buyerName: string;
  buyerCompany: string;
  buyerEmail: string;
  buyerPhone: string;
  quantityRequested: string;
  message: string;
}

const initialValues: InquiryFormValues = {
  buyerName: '', buyerCompany: '', buyerEmail: '', buyerPhone: '', quantityRequested: '', message: '',
};

export function InquiryForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [values, setValues] = useState<InquiryFormValues>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(field: keyof InquiryFormValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await submitInquiry({
        productId,
        buyerName: values.buyerName,
        buyerCompany: values.buyerCompany || undefined,
        buyerEmail: values.buyerEmail,
        buyerPhone: values.buyerPhone || undefined,
        quantityRequested: Number(values.quantityRequested),
        message: values.message || undefined,
      });
      router.push('/inquiry-sent');
    } catch {
      setError('Something went wrong submitting your inquiry. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid max-w-md gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="buyerName">Name*</Label>
        <Input id="buyerName" required value={values.buyerName} onChange={handleChange('buyerName')} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="buyerCompany">Company</Label>
        <Input id="buyerCompany" value={values.buyerCompany} onChange={handleChange('buyerCompany')} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="buyerEmail">Email*</Label>
        <Input id="buyerEmail" required type="email" value={values.buyerEmail} onChange={handleChange('buyerEmail')} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="buyerPhone">Phone</Label>
        <Input id="buyerPhone" value={values.buyerPhone} onChange={handleChange('buyerPhone')} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="quantityRequested">Quantity requested*</Label>
        <Input id="quantityRequested" required type="number" min="0" value={values.quantityRequested} onChange={handleChange('quantityRequested')} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" value={values.message} onChange={handleChange('message')} />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit inquiry'}
      </Button>
    </form>
  );
}