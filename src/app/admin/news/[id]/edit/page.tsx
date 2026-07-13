import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <div>
      <p className="spec-tag text-primary">Content · News</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">Edit post</h1>
      <div className="mt-8">
        <PostForm initial={post} />
      </div>
    </div>
  );
}
