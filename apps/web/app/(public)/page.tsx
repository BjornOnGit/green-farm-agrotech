import Link from 'next/link';
import { getProducts } from '@/lib/api-client';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Product Catalog</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="block">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}