"use client";

import Link from "next/link";
import CartNav from "./CartNav";
import AuthNav from "./AuthNav";
import type { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
}

export default function Navbar({ session }: NavbarProps) {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          PassTheTest.com
        </Link>

        <div className="hidden space-x-4 md:flex items-center">
          <Link href="/" className="p-2 text-xl hover:underline">
            Home
          </Link>
          <Link href="/contact" className="p-2 text-xl hover:underline">
            Contact Us
          </Link>
          <CartNav />
          <AuthNav session={session} />
        </div>
      </div>
    </nav>
  );
}