import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In",
  description: "Sign in to the Swincotex admin dashboard.",
};

export default async function LoginPage() {
  // If there's already a valid session, skip the form entirely rather
  // than showing a sign-in page to someone who's already signed in.
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}