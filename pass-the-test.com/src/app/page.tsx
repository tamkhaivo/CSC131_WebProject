import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import SearchBar from "~/app/_components/search";
import Footer from "~/app/_components/footer";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { PaymentForm } from "~/app/_components/PaymentForm";
import Navbar from "./_components/nav";
export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();
  /*
  TO DO: Create User Session
  
  if (session?.user) {
    void api.post.getLatest.prefetch();
  }
  */
  return (
    <HydrateClient>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <SearchBar />
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Studying made easy</span>{" "}
            so you can focus on the things that matter!
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="#_testimonials"
            >
              <h2 className="text-2xl font-bold">Testimonials →</h2>
              <div className="text-lg">
                Look what other people had to say about our service!
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="/contact"
            >
              <h2 className="text-2xl font-bold">Contact Us →</h2>
              <div className="text-lg">
                Got an idea? Let us know how we can improve!
              </div>
            </Link>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          {session?.user && <LatestPost />}

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold">Test Payment</h2>
            <PaymentForm />
          </div>
        </div>

        <div className="container mt-20 flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h2 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Who are we?</span>
          </h2>
          <p className="text-2xl font-bold">
            We are a learning archive center for Computer Science Upper Division
            Courses, ranging from Bachelor&apos;s to Master&apos;s.
          </p>
        </div>
        <button></button>
      </main>
      <Footer />
    </HydrateClient>
  );
}
