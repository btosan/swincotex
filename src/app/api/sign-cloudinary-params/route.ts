import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireSessionResponse } from "@/lib/authz";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Signs Cloudinary upload params so only authenticated Admin/Staff users
// can push assets into the media library — the CldUploadWidget on the
// client calls this before every upload (see ImageUploadField.tsx).
export async function POST(request: Request) {
  const { response } = await requireSessionResponse();
  if (response) return response;

  const body = await request.json();
  const { paramsToSign } = body as { paramsToSign: Record<string, string> };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!,
  );

  return NextResponse.json({ signature });
}
