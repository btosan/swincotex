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
  Eye,
} from "lucide-react";

export const dynamic = "force-dynamic";

const PERIODS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "all", label: "All time" },
] as const;

type Period = (typeof PERIODS)[number]["value"];

function periodStartDate(period: Period): Date | null {
  const now = new Date();
  if (period === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  if (period === "7d") {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  if (period === "30d") {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  return null; // all time
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>;
}) {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  const { period: periodParam } = await searchParams;
  const period: Period = PERIODS.some((p) => p.value === periodParam)
    ? (periodParam as Period)
    : "7d";
  const since = periodStartDate(period);
  const dateWhere = since ? { createdAt: { gte: since } } : {};

  const [
    unreadMessages,
    serviceCount,
    projectCount,
    postCount,
    pageViewGroups,
    totalViews,
    topPaths,
  ] = await Promise.all([
    isAdmin
      ? prisma.contactSubmission.count({ where: { status: "UNREAD" } })
      : Promise.resolve(0),
    isAdmin ? prisma.service.count() : Promise.resolve(0),
    isAdmin ? prisma.project.count() : Promise.resolve(0),
    prisma.post.count({
      where: session?.user.id ? { authorId: session.user.id } : undefined,
    }),
    isAdmin
      ? prisma.pageView.groupBy({ by: ["visitorHash"], where: dateWhere })
      : Promise.resolve([]),
    isAdmin ? prisma.pageView.count({ where: dateWhere }) : Promise.resolve(0),
    isAdmin
      ? prisma.pageView.groupBy({
          by: ["path"],
          where: dateWhere,
          _count: { path: true },
          orderBy: { _count: { path: "desc" } },
          take: 5,
        })
      : Promise.resolve([]),
  ]);

  const uniqueVisitors = pageViewGroups.length;

  const stats = isAdmin
    ? [
        { label: "Unread messages", value: unreadMessages, icon: Mail },
        { label: "Services", value: serviceCount, icon: Wrench },
        { label: "Projects", value: projectCount, icon: FolderKanban },
        { label: "News posts", value: postCount, icon: Newspaper },
      ]
    : [{ label: "Your news posts", value: postCount, icon: Newspaper }];

  const quickLinks = isAdmin
    ? [
        { href: "/admin/messages", label: "Messages", icon: Mail },
        { href: "/admin/services", label: "Services", icon: Wrench },
        { href: "/admin/projects", label: "Projects", icon: FolderKanban },
        { href: "/admin/team", label: "Team", icon: Users },
        { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
        { href: "/admin/news", label: "News", icon: Newspaper },
        { href: "/admin/about", label: "About", icon: Info },
        { href: "/admin/contact", label: "Contact", icon: Info },
      ]
    : [{ href: "/admin/news", label: "News", icon: Newspaper }];

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

              <h3 className="mt-4 font-semibold text-navy">{label}</h3>

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
            <div key={label} className="rounded-md border border-line bg-white p-6">
              <Icon size={22} className="text-primary" />

              <p className="mt-4 font-display text-3xl font-bold text-navy">
                {value}
              </p>

              <p className="mt-1 text-sm text-steel">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Website Visitors */}
      {isAdmin && (
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-navy">
              Website visitors
            </h2>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <Link
                  key={p.value}
                  href={`/admin?period=${p.value}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                    period === p.value
                      ? "border-primary bg-primary-light text-primary"
                      : "border-line text-steel hover:border-primary"
                  }`}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-5 lg:grid-cols-4">
            <div className="rounded-md border border-line bg-white p-6">
              <Users size={20} className="text-primary" />
              <p className="mt-4 font-display text-3xl font-bold text-navy">
                {uniqueVisitors}
              </p>
              <p className="mt-1 text-sm text-steel">Unique visitors</p>
            </div>
            <div className="rounded-md border border-line bg-white p-6">
              <Eye size={20} className="text-primary" />
              <p className="mt-4 font-display text-3xl font-bold text-navy">
                {totalViews}
              </p>
              <p className="mt-1 text-sm text-steel">Total page views</p>
            </div>

            <div className="col-span-2 rounded-md border border-line bg-white p-6">
              <p className="text-sm font-semibold text-navy">Top pages</p>
              <ul className="mt-3 flex flex-col gap-2">
                {topPaths.map((p) => (
                  <li
                    key={p.path}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="truncate text-steel">{p.path}</span>
                    <span className="shrink-0 font-mono text-xs text-steel-light">
                      {p._count.path}
                    </span>
                  </li>
                ))}
                {topPaths.length === 0 && (
                  <li className="text-sm text-steel-light">
                    No visits recorded yet for this period.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <p className="mt-4 text-xs text-steel-light">
            Counts visits with JavaScript enabled and no ad-blocker interfering — treat
            as a reasonable estimate, not an exact figure.
          </p>
        </section>
      )}
    </div>
  );
}