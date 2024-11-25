"use client";

import { useSession } from "next-auth/react";
import { useCart } from "../_components/CartContext";
import Navbar from "../_components/nav";
import { api } from "~/trpc/server";

export default function CartPage() {
  const { data: session } = useSession();
  const { items, removeItem, updateQuantity, totalItems } = useCart();
  const { mutate: checkout } = api.post.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    checkout({
      products: items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        title: item.title
      }))
    });
  };

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold">Shopping Cart ({totalItems} items)</h1>
          {items.map((item) => (
            <div key={item.id} className="mb-4 flex items-center justify-between border-b border-white/20 pb-4">
              <div>
                <h2 className="text-xl">{item.title}</h2>
                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-20 rounded bg-white/20 px-2 py-1 text-center"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {items.length > 0 && (
            <div className="mt-8">
              <p className="mb-4 text-2xl">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="rounded bg-green-500 px-6 py-3 text-lg font-semibold hover:bg-green-600"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
} 