import type { Product } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="size-4 text-muted-foreground" />
          {product.name}
        </CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="font-medium">
          {product.pricePerUnit
            ? `₦${Number(product.pricePerUnit).toLocaleString()} / ${product.unit}`
            : `Price on request / ${product.unit}`}
        </p>
        <p className="text-sm text-muted-foreground">
          {Number(product.quantityAvailable).toLocaleString()} {product.unit} available
        </p>
      </CardContent>
    </Card>
  );
}