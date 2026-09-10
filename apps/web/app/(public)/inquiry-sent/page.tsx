import Link from 'next/link';

export default function InquirySentPage() {
  return (
    <div>
      <h1>Thank you!</h1>
      <p>We&apos;ve received your inquiry and will be in touch shortly.</p>
      <Link href="/">Back to catalog</Link>
    </div>
  );
}