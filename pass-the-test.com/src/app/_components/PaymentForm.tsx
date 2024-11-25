"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentResponse {
  clientSecret: string;
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An unknown error occurred");
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 space-y-4">
      <PaymentElement />
      <button
        disabled={!stripe || isProcessing}
        className="w-full rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
}

export function PaymentForm() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const handleStartPayment = async () => {
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }),
    });
    const data = (await response.json()) as PaymentResponse;
    setClientSecret(data.clientSecret);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!clientSecret && (
        <button
          onClick={handleStartPayment}
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        >
          Start Payment
        </button>
      )}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
} 