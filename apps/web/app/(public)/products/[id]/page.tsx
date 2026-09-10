import { notFound } from 'next/navigation';
import { getProduct } from '../../../../lib/api-client';
import { InquiryForm } from '../../../../components/InquiryForm';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p style={{ color: '#666' }}>{product.category}</p>
      <p>
        {product.pricePerUnit
          ? `₦${Number(product.pricePerUnit).toLocaleString()} / ${product.unit}`
          : `Price on request / ${product.unit}`}
      </p>
      <p>{Number(product.quantityAvailable).toLocaleString()} {product.unit} available</p>
      {product.sourceLocation && <p>Sourced from: {product.sourceLocation}</p>}
      <h2>Request a quote</h2>
      <InquiryForm productId={product.id} />
    </div>
  );
}