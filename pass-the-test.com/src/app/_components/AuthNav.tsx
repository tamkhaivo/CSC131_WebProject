"use client";

import Link from "next/link";
import type { Session } from "next-auth";

interface AuthNavProps {
  session: Session | null;
}

export default function AuthNav({ session }: AuthNavProps) {
  return session ? (
    <Link href="/api/auth/signout" className="p-2 text-xl hover:underline flex items-center gap-2 block text-white hover:bg-gray-600 hover:underline">
      Logout {session.user?.name}
    </Link>
  ) : (
    <Link href="/api/auth/signin" className="p-2 text-xl hover:underline flex items-center gap-2 block text-white hover:bg-gray-600 hover:underline">
      Login
    </Link>
  );
} 