import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <p className="spec-tag text-primary">Content · News</p>
      <h1 className="mt-1 font-display text-2xl font-bold text-navy">New post</h1>
      <div className="mt-8">
        <PostForm />
      </div>
    </div>
  );
}
