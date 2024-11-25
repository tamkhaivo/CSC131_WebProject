"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartNav() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="p-2 text-xl hover:underline flex items-center gap-2 block text-white hover:bg-gray-600 hover:underline">
      <ShoppingCart className="h-6 w-6" />
      <span>Cart ({totalItems})</span>
    </Link>
  );
} 