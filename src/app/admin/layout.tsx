import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  FolderKanban,
  Users,
  Image as ImageIcon,
  Newspaper,
  Mail,
  Info,
} from "lucide-react";
import { auth } from "@/lib/auth";
import Providers from "@/components/Providers";
import NotificationBell from "@/components/admin/NotificationBell";
import SignOutButton from "@/components/admin/SignOutButton";

const ADMIN_ONLY_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/about", label: "About page", icon: Info },
  { href: "/admin/contact", label: "Contact page", icon: Info },
];

const STAFF_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/news", label: "News", icon: Newspaper },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const navItems = session.user.role === "ADMIN" ? ADMIN_ONLY_NAV : STAFF_NAV;

  return (
    <Providers>
      <div className="flex min-h-screen bg-paper">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
          <div className="border-b border-line px-6 py-5">
            <p className="spec-tag text-primary">Swincotex</p>
            <p className="font-display text-lg font-bold text-navy">Admin</p>
          </div>

          <nav className="flex flex-1 flex-col gap-1 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-steel hover:bg-paper hover:text-navy"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-line p-4">
            <p className="truncate text-sm font-medium text-navy">{session.user.name}</p>
            <p className="truncate text-xs text-steel-light">{session.user.role}</p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-end gap-3 border-b border-line bg-white px-6 py-3">
            <NotificationBell />
            <SignOutButton />
          </header>

          <main className="flex-1 p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </Providers>
  );
}
