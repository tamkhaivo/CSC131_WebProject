"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./_components/CartContext";
import { api } from "~/trpc/react";
import { useState } from "react";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => 
    api.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
        }),
      ],
    })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <api.Provider client={trpcClient} queryClient={queryClient}>
          <CartProvider>{children}</CartProvider>
        </api.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
} 