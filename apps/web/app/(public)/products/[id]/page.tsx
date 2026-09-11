import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api-client';
import { InquiryForm } from '@/components/InquiryForm';
import { MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

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
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="text-muted-foreground">{product.category}</p>
        <p className="mt-4 text-lg font-medium">
          {product.pricePerUnit
            ? `₦${Number(product.pricePerUnit).toLocaleString()} / ${product.unit}`
            : `Price on request / ${product.unit}`}
        </p>
        <p className="text-sm text-muted-foreground">
          {Number(product.quantityAvailable).toLocaleString()} {product.unit} available
        </p>
        {product.sourceLocation && (
          <p className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-4" /> {product.sourceLocation}
          </p>
        )}
      </div>
      <div>
        <h2 className="mb-4 text-lg font-semibold">Request a quote</h2>
        <InquiryForm productId={product.id} />
      </div>
    </div>
  );
}