// components/Navbar.tsx
import Link from "next/link";
import { auth } from "~/server/auth";

export default async function Navbar() {
  const session = await auth();
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold">
          PassTheTest.com
        </Link>

        {/* Responsive Menu */}
        <div className="hidden space-x-4 md:flex">
          <Link href="/" className="p-2 hover:underline">
            Home
          </Link>
          {session && (
            <Link href="/api/auth/signout" className="p-2 hover:underline">
              Logout {session.user?.name}
            </Link>
          )}
          {!session && (
            <Link href="/api/auth/signin" className="p-2 hover:underline">
              Login
            </Link>
          )}

          <Link href="/contact" className="p-2 hover:underline">
            Contact Us
          </Link>
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
      <div className="space-y-2 bg-gray-700 p-4 md:hidden">
        <Link href="/" className="block p-2 text-white hover:bg-gray-600">
          Home
        </Link>
        {session && (
          <Link href="/api/auth/signout" className="p-2 hover:underline">
            Logout {session.user?.name}
          </Link>
        )}
        {!session && (
          <Link href="/api/auth/signin" className="p-2 hover:underline">
            Login
          </Link>
        )}
        <Link
          href="/contact"
          className="block p-2 text-white hover:bg-gray-600"
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}
