import Footer from "~/app/_components/footer";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Navbar from "../_components/nav";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  const products = await api.post.getAllProducts();
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <HydrateClient>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Search Results
          </h1>
          {products.map((item) => (
            <li className="list-none" key={item.id}>
              <h2 className="text-2xl hover:underline"><Link href={`/products/${item.id}`}>{item.title}</Link></h2>
              <p>{formattedNumber.format(item.price)}</p>
              <p>{item.desc}</p>
            </li>
          ))}
        </div>
      </main>
      <Footer />
    </HydrateClient>
  );
}
