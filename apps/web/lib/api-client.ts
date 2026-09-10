import type { Product } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }
  return res.json();
}

export interface InquiryPayload {
  productId: string;
  buyerName: string;
  buyerCompany?: string;
  buyerEmail: string;
  buyerPhone?: string;
  quantityRequested: number;
  message?: string;
}

export async function submitInquiry(payload: InquiryPayload) {
  const res = await fetch(`${API_URL}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit inquiry: ${res.status}`);
  }
  return res.json();
}