import { prisma } from "@/lib/prisma";
import MessageRow from "@/components/admin/MessageRow";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactSubmission.findMany({
    where: { status: { not: "ARCHIVED" } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="spec-tag text-primary">Inbox</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Messages</h1>

      <div className="mt-8 flex flex-col gap-3">
        {messages.map((message) => (
          <MessageRow key={message.id} message={message} />
        ))}

        {messages.length === 0 && (
          <p className="rounded-md border border-line bg-white px-5 py-10 text-center text-steel-light">
            No messages yet.
          </p>
        )}
      </div>
    </div>
  );
}
