export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  pricePerUnit: string | null;
  quantityAvailable: string;
  sourceLocation: string | null;
  isActive: boolean;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  productId: string;
  buyerName: string;
  buyerCompany: string | null;
  buyerEmail: string;
  buyerPhone: string | null;
  quantityRequested: string;
  message: string | null;
  status: 'NEW' | 'CONTACTED' | 'QUOTED' | 'CLOSED';
  internalNotes: string | null;
  createdAt: string;
}