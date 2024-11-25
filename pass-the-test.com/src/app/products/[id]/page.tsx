"use client";

import { useSession } from "next-auth/react";
import Navbar from "~/app/_components/nav";
import { api } from "~/trpc/server";
import { useParams } from "next/navigation";
import { useCart } from "~/app/_components/CartContext";

export default function ProductPage() {
  const { data: session } = useSession();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const { addItem } = useCart();
  
  const { data: product, isLoading } = api.post.getProductById.useQuery({ id });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar session={session} />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          Loading...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar session={session} />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
          Product not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold">{product.title}</h1>
          <p className="mb-4 text-lg">{product.desc}</p>
          <p className="text-2xl mb-4">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </main>
    </>
  );
}

