"use client";

import { useCart } from "~/app/_components/CartContext";

interface Product {
  id: string;
  title: string;
  desc: string;
  price: number;
  sale: number | null;
  createdAt: Date;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p className="mb-4">{product.desc}</p>
      <p className="text-2xl mb-4">Price: {formattedNumber.format(product.price)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      >
        Add to Cart
      </button>
    </div>
  );
} 