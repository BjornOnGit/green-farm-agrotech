import Link from 'next/link';
import { getProducts } from '../../lib/api-client';
import { ProductCard } from '../../components/ProductCard';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1rem',
      }}
    >
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}