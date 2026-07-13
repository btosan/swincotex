"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-sm text-steel hover:bg-paper ${
        active ? "bg-primary-light text-primary" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default function TiptapEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    // Prevents SSR hydration mismatches — Tiptap only ever renders client-side.
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-sm" } }),
      Placeholder.configure({ placeholder: "Write the post…" }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] max-w-none rounded-b-sm border border-t-0 border-line px-4 py-3 text-sm text-navy outline-none focus:border-primary [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-3 [&_h3]:mb-2 [&_p]:mb-3 [&_p]:leading-relaxed [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-2 [&_blockquote]:border-sky [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-steel [&_a]:text-primary [&_a]:underline [&_img]:my-3",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  function setLink() {
    const previousUrl = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  function handleImageUpload(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
      editor!.chain().focus().setImage({ src: result.info.secure_url as string }).run();
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-0.5 rounded-t-sm border border-line bg-paper p-1.5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} label="Strikethrough">
          <Strikethrough size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-line" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
          label="Heading 3"
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-line" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bullet list">
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Numbered list">
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Quote">
          <Quote size={15} />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-line" />

        <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="Link">
          <LinkIcon size={15} />
        </ToolbarButton>

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            sources: ["local", "url", "camera"],
            multiple: false,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 10_000_000,
            folder: "swincotex/news",
          }}
          onSuccess={handleImageUpload}
        >
          {({ open }) => (
            <ToolbarButton onClick={() => open()} label="Insert image">
              <ImageIcon size={15} />
            </ToolbarButton>
          )}
        </CldUploadWidget>

        <span className="mx-1 h-5 w-px bg-line" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} label="Undo">
          <Undo2 size={15} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} label="Redo">
          <Redo2 size={15} />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
