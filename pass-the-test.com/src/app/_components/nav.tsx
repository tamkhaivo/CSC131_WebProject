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

        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/" className="p-2 text-xl hover:underline">
            Home
          </Link>
          <Link href="/contact" className="p-2 text-xl hover:underline">
            Contact Us
          </Link>
          <CartNav />
          <AuthNav session={session} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white">
            <span className="my-1 block h-1 w-6 bg-white"></span>
            <span className="my-1 block h-1 w-6 bg-white"></span>
            <span className="my-1 block h-1 w-6 bg-white"></span>
          </button>
        </div>
      </div>
      {/* Mobile Menu (Hidden on Medium screens and larger) */}
      <div className="gap-3 space-y-2 bg-gray-700 p-4 md:hidden">
        <Link
          href="/"
          className="block p-2 text-xl text-white hover:bg-gray-600 hover:underline"
        >
          Home
        </Link>
        <Link
          href="/contact"
          className="block p-2 text-xl text-white hover:bg-gray-600 hover:underline"
        >
          Contact Us
        </Link>
        <CartNav />
        <AuthNav session={session} />
      </div>
    </nav>
  );
}
