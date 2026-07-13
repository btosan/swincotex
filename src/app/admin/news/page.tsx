import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="spec-tag text-primary">Content</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-navy">News</h1>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={16} /> New post
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-md border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper text-xs uppercase tracking-wide text-steel-light">
            <tr>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Author</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-line last:border-b-0">
                <td className="px-5 py-3 font-medium text-navy">{post.title}</td>
                <td className="px-5 py-3 text-steel">{post.author.name}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      post.published ? "bg-primary-light text-primary" : "bg-paper text-steel-light"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/news/${post.id}/edit`}
                      aria-label={`Edit ${post.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-paper hover:text-primary"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteButton endpoint={`/api/admin/news/${post.id}`} confirmLabel={post.title} />
                  </div>
                </td>
              </tr>
            ))}

            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-steel-light">
                  No posts yet — write your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
