'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { submitInquiry } from '../lib/api-client';

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
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', maxWidth: 400 }}>
      <label>Name*<input required value={values.buyerName} onChange={handleChange('buyerName')} /></label>
      <label>Company<input value={values.buyerCompany} onChange={handleChange('buyerCompany')} /></label>
      <label>Email*<input required type="email" value={values.buyerEmail} onChange={handleChange('buyerEmail')} /></label>
      <label>Phone<input value={values.buyerPhone} onChange={handleChange('buyerPhone')} /></label>
      <label>Quantity requested*<input required type="number" min="0" value={values.quantityRequested} onChange={handleChange('quantityRequested')} /></label>
      <label>Message<textarea value={values.message} onChange={handleChange('message')} /></label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit inquiry'}</button>
    </form>
  );
}