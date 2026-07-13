import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Mail,
  Wrench,
  FolderKanban,
  Newspaper,
  Users,
  Image as ImageIcon,
  Info,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  const [unreadMessages, serviceCount, projectCount, postCount] =
    await Promise.all([
      isAdmin
        ? prisma.contactSubmission.count({
            where: { status: "UNREAD" },
          })
        : Promise.resolve(0),
      isAdmin ? prisma.service.count() : Promise.resolve(0),
      isAdmin ? prisma.project.count() : Promise.resolve(0),
      prisma.post.count({
        where: session?.user.id
          ? { authorId: session.user.id }
          : undefined,
      }),
    ]);

  const stats = isAdmin
    ? [
        { label: "Unread messages", value: unreadMessages, icon: Mail },
        { label: "Services", value: serviceCount, icon: Wrench },
        { label: "Projects", value: projectCount, icon: FolderKanban },
        { label: "News posts", value: postCount, icon: Newspaper },
      ]
    : [
        {
          label: "Your news posts",
          value: postCount,
          icon: Newspaper,
        },
      ];

  const quickLinks = isAdmin
    ? [
        {
          href: "/admin/messages",
          label: "Messages",
          icon: Mail,
        },
        {
          href: "/admin/services",
          label: "Services",
          icon: Wrench,
        },
        {
          href: "/admin/projects",
          label: "Projects",
          icon: FolderKanban,
        },
        {
          href: "/admin/team",
          label: "Team",
          icon: Users,
        },
        {
          href: "/admin/gallery",
          label: "Gallery",
          icon: ImageIcon,
        },
        {
          href: "/admin/news",
          label: "News",
          icon: Newspaper,
        },
        {
          href: "/admin/about",
          label: "About",
          icon: Info,
        },
        {
          href: "/admin/contact",
          label: "Contact",
          icon: Info,
        },
      ]
    : [
        {
          href: "/admin/news",
          label: "News",
          icon: Newspaper,
        },
      ];

  return (
    <div>
      <p className="spec-tag text-primary">Overview</p>

      <h1 className="mt-1 font-display text-2xl font-bold text-navy">
        Welcome back, {session?.user.name}
      </h1>

      {/* Quick Actions */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {quickLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-md border border-line bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-paper text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-navy">
                {label}
              </h3>

              <p className="mt-1 text-sm text-steel">
                Manage {label.toLowerCase()}.
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Statistics */}
      <section className="mt-12">
        <div className="mb-4">
          <h2 className="font-display text-xl font-semibold text-navy">
            Statistics
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-md border border-line bg-white p-6"
            >
              <Icon size={22} className="text-primary" />

              <p className="mt-4 font-display text-3xl font-bold text-navy">
                {value}
              </p>

              <p className="mt-1 text-sm text-steel">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}