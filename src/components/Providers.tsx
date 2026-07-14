"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import VisitorTracker from "@/components/VisitorTracker";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <VisitorTracker />
      {children}
    </SessionProvider>
  );
}
