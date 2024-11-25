"use client";

import { useSession } from "next-auth/react";
import Navbar from "~/app/_components/nav";
import { useEffect, Suspense } from "react";
import { useCart } from "../../_components/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

function PaymentSuccessContent() {
  const { data: session, status } = useSession();
  const { clearCart, items } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get("payment_intent");

  const { mutate: recordTransaction } = api.post.recordTransaction.useMutation({
    onSuccess: () => {
      clearCart();
      setTimeout(() => router.push('/'), 5000);
    },
    onError: (error) => {
      console.error('Transaction failed:', error);
      setTimeout(() => router.push('/'), 5000);
    }
  });

  useEffect(() => {
    if (paymentIntent) {
      recordTransaction({
        paymentIntentId: paymentIntent,
        products: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      });
    } else {
      setTimeout(() => router.push('/'), 5000);
    }
  }, [paymentIntent, items, recordTransaction, router]);

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-8 text-4xl font-bold">Thank you for your purchase!</h1>
          <p className="text-xl">Your order has been processed successfully.</p>
          <p className="mt-4 text-gray-300">You will be redirected to the home page in a few seconds...</p>
        </div>
      </main>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
} 