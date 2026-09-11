import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InquirySentPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <CheckCircle2 className="size-12 text-primary" />
      <h1 className="text-2xl font-semibold">Thank you!</h1>
      <p className="text-muted-foreground">We&apos;ve received your inquiry and will be in touch shortly.</p>
      <Button asChild>
        <Link href="/">Back to catalog</Link>
      </Button>
    </div>
  );
}