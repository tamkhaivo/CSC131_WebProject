"use client";

import { useSession, SessionProvider } from "next-auth/react";
import { api } from "~/trpc/server";
import Navbar from "~/app/_components/nav";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function SearchPageContent() {
  const { data: session } = useSession();
  const { data: products, isLoading } = api.post.getAllProducts.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!products) return <div>No products found</div>;

  return (
    <>
      <Navbar session={session} />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="mb-8 text-4xl font-bold">Search Results</h1>
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.id} className="border-b border-white/20 pb-4">
                <Link href={`/products/${product.id}`}>
                  <h2 className="text-2xl hover:underline">{product.title}</h2>
                  <p className="text-gray-300">{product.desc}</p>
                  <p className="mt-2 text-xl">${product.price.toFixed(2)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SearchPageContent />
      </QueryClientProvider>
    </SessionProvider>
  );
}
