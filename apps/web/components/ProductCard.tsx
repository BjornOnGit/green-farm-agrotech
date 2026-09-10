import type { Product } from '../lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: '1rem' }}>
      <h3 style={{ margin: 0 }}>{product.name}</h3>
      <p style={{ margin: '0.25rem 0', color: '#666' }}>{product.category}</p>
      <p style={{ margin: '0.25rem 0' }}>
        {product.pricePerUnit
          ? `₦${Number(product.pricePerUnit).toLocaleString()} / ${product.unit}`
          : `Price on request / ${product.unit}`}
      </p>
      <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#888' }}>
        {Number(product.quantityAvailable).toLocaleString()} {product.unit} available
      </p>
    </div>
  );
}