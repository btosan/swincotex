"use client";

import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { UploadCloud, X } from "lucide-react";

export default function MultiImageField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
}) {
  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
      onChange([...values, result.info.secure_url as string]);
    }
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="text-xs font-semibold text-navy">{label}</label>

      <div className="mt-1.5 flex flex-wrap gap-3">
        {values.map((url, i) => (
          <div key={`${url}-${i}`} className="group relative h-16 w-16 shrink-0">
            <img src={url} alt="" className="h-16 w-16 rounded-sm border border-line object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              aria-label="Remove image"
              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white opacity-0 group-hover:opacity-100"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        <CldUploadWidget
          signatureEndpoint="/api/sign-cloudinary-params"
          options={{
            sources: ["local", "url", "camera"],
            multiple: true,
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
              className="flex h-16 w-16 shrink-0 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-line text-steel-light hover:border-primary hover:text-primary"
            >
              <UploadCloud size={16} />
              <span className="text-[10px] font-semibold">Add</span>
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
