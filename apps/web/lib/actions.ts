'use server';

import { adminFetch } from './admin-api';

export async function updateProductQuantity(id: string, quantityAvailable: number) {
  return adminFetch(`/admin/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantityAvailable }),
  });
}

export async function updateInquiryStatus(id: string, status: string) {
  return adminFetch(`/admin/inquiries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}