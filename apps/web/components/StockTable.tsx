'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { updateProductQuantity } from '@/lib/actions';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function StockTable({ products }: { products: Product[] }) {
  const [quantities, setQuantities] = useState<Record<string, string>>(
    Object.fromEntries(products.map((p) => [p.id, p.quantityAvailable])),
  );
  const [savingId, setSavingId] = useState<string | null>(null);

  async function handleBlur(id: string) {
    const value = Number(quantities[id]);
    if (Number.isNaN(value)) return;
    setSavingId(id);
    try {
      await updateProductQuantity(id, value);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                min="0"
                className="w-24 ml-auto"
                value={quantities[product.id]}
                disabled={savingId === product.id}
                onChange={(e) => setQuantities((prev) => ({ ...prev, [product.id]: e.target.value }))}
                onBlur={() => handleBlur(product.id)}
              />
            </TableCell>
            <TableCell>{product.unit}</TableCell>
            <TableCell>
              <Badge variant={product.isActive ? 'default' : 'secondary'}>
                {product.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}