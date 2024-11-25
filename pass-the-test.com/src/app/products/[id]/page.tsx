// app/products/[id]/page.tsx
import { api, HydrateClient } from "~/trpc/server";
import Footer from "~/app/_components/footer";
import Navbar from "~/app/_components/nav";
import { auth } from "~/server/auth";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  // Await the params object
  const { id } = await params; // Await params to access the id
  const products = await api.post.getAllProducts();
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  const product = products.find((product) => product.id === id);
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <HydrateClient>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div>
            <h1>{product.title}</h1>
            <p>{product.desc}</p>
            <p>Price: {formattedNumber.format(product.price)}</p>

            {/*
              TO DO: Add STRIPE Components
            
            */}
          </div>
        </div>
      </main>
      <Footer />
    </HydrateClient>
  );
};

export default ProductPage;
