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