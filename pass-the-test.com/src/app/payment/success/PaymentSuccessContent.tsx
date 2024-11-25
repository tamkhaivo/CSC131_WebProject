"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Payment Successful!
      </h1>
      <p className="text-2xl">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>
      {paymentIntent && (
        <p className="text-sm text-gray-400">
          Payment ID: {paymentIntent}
        </p>
      )}
      <Link
        href="/"
        className="mt-8 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Return to Home
      </Link>
    </div>
  );
} 