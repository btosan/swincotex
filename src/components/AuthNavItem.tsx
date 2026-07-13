"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, LayoutDashboard, LogOut } from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

type AuthNavItemProps = {
  onNavigate?: () => void; // Optional callback to close mobile menu
};

export default function AuthNavItem({ onNavigate }: AuthNavItemProps) {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status === "loading") {
    return <div className="h-9 w-9 shrink-0 rounded-full bg-white/5" />;
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <Link
        href="/login"
        aria-label="Admin & staff login"
        title="Admin & staff login"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/85 hover:bg-white/5 hover:text-white"
        onClick={onNavigate}
      >
        <User size={18} />
      </Link>
    );
  }

  const { name, image } = session.user;

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary/40 hover:cursor-pointer text-xs font-semibold text-white ring-1 ring-transparent hover:ring-white/20"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name ?? "Account"} className="h-full w-full object-cover" />
        ) : (
          initials(name ?? "?")
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-line bg-white py-1.5 shadow-2xl shadow-black/20">
          <p className="truncate border-b border-line px-4 py-2.5 text-xs text-steel-light">{name}</p>
          
          <Link
            href="/admin"
            onClick={() => {
              setOpen(false);
              onNavigate?.(); // Close mobile drawer
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-navy hover:bg-paper"
          >
            <LayoutDashboard size={15} /> Dashboard
          </Link>
          
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/login" });
              onNavigate?.();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-paper"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}