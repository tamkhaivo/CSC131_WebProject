import Link from "next/link";
import Footer from "~/app/_components/footer";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import Navbar from "../_components/nav";

export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]">
            Contact Us
          </h1>
          <p>Work In Progress</p>
          <h2
            id="_Private_Policy"
            className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]"
          >
            Privacy Policy
          </h2>
          <p>Work In Progress</p>
          <h2
            id="_Terms_and_Conditions"
            className="text-5xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]"
          >
            Terms &#38; Conditions
          </h2>
          <p>Work In Progress</p>
        </div>
      </main>
      <Footer />
    </HydrateClient>
  );
}