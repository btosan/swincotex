import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MessageRow from "@/components/admin/MessageRow";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const showArchived = view === "archived";

  const [messages, archivedCount] = await Promise.all([
    prisma.contactSubmission.findMany({
      where: showArchived ? { status: "ARCHIVED" } : { status: { not: "ARCHIVED" } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactSubmission.count({ where: { status: "ARCHIVED" } }),
  ]);

  return (
    <div>
      <p className="spec-tag text-primary">Inbox</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Messages</h1>

      <div className="mt-6 flex gap-1 border-b border-line">
        <Link
          href="/admin/messages"
          className={`border-b-2 px-4 py-2.5 text-sm font-semibold ${
            !showArchived ? "border-primary text-primary" : "border-transparent text-steel-light hover:text-navy"
          }`}
        >
          Inbox
        </Link>
        <Link
          href="/admin/messages?view=archived"
          className={`border-b-2 px-4 py-2.5 text-sm font-semibold ${
            showArchived ? "border-primary text-primary" : "border-transparent text-steel-light hover:text-navy"
          }`}
        >
          Archived {archivedCount > 0 && `(${archivedCount})`}
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}

        {messages.length === 0 && (
          <p className="rounded-md border border-line bg-white px-5 py-10 text-center text-steel-light">
            {showArchived ? "No archived messages." : "No messages yet."}
          </p>
        )}
      </div>
    </div>
  );
}
