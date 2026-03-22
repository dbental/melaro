import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up — Melaro",
  description: "Create your Melaro account and start orchestrating AI teams.",
};

export default function SignupPage() {
  return <SignupForm />;
}
