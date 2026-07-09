import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark px-4 text-center text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.jpg" alt="Lal Distributors" className="h-20 w-20 rounded-2xl object-cover ring-2 ring-brand-yellow/50" />
      <p className="mt-6 text-7xl font-black text-brand-gradient">404</p>
      <h1 className="mt-2 text-2xl font-black">Page not found</h1>
      <p className="mt-2 max-w-sm text-gray-300">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="brand-gradient rounded-full px-7 py-3 font-bold text-white shadow">
          Go to Homepage
        </Link>
        <Link href="/products" className="rounded-full border-2 border-brand-yellow px-7 py-3 font-bold text-brand-yellow hover:bg-brand-yellow hover:text-brand-dark">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
