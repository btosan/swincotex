"use client";

import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { UploadCloud } from "lucide-react";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
      onChange(result.info.secure_url as string);
    }
  }

  return (
    <div>
      <label className="text-xs font-semibold text-navy">{label}</label>
      <div className="mt-1.5 flex items-center gap-4">
        {value ? (
          <img src={value} alt="" className="h-16 w-16 rounded-sm border border-line object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-sm border border-dashed border-line text-steel-light">
            <UploadCloud size={20} />
          </div>
        )}

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            sources: ["local", "url", "camera"],
            multiple: false,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
            maxFileSize: 10_000_000,
            folder: "swincotex",
          }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center gap-2 rounded-sm border border-line px-3.5 py-2 text-xs font-semibold text-navy hover:border-primary"
            >
              <UploadCloud size={14} />
              {value ? "Replace image" : "Choose image"}
            </button>
          )}
        </CldUploadWidget>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="or paste an image URL"
          className="min-w-0 flex-1 rounded-sm border border-line px-3 py-2 text-xs text-steel outline-none focus:border-primary"
        />
      </div>
    </div>
  );
}
