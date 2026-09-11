import { adminFetch } from '@/lib/admin-api';
import { StockTable } from '@/components/StockTable';
import type { Product } from '@/lib/types';

export default async function AdminProductsPage() {
  const products: Product[] = await adminFetch('/admin/products');
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Products</h1>
      <StockTable products={products} />
    </div>
  );
}