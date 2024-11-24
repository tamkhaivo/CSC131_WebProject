"use client";

// components/Navbar.js
import exp from "constants";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          PassTheTest.com
        </Link>

        <div className="flex">
          {/* Links */}
          <button
            className="block md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <div
            className={`flex-col md:flex md:flex-row ${
              isOpen ? "flex" : "hidden"
            }`}
          >
            <Link href="/" className="p-2 hover:underline">
              Home
            </Link>
            <Link href="/about" className="p-2 hover:underline">
              Login
            </Link>
            <Link href="/contact" className="p-2 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
