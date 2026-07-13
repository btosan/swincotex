"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      aria-label="Sign out"
      className="flex h-10 w-10 items-center justify-center rounded-full text-steel hover:bg-paper"
    >
      <LogOut size={18} />
    </button>
  );
}
