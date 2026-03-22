import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in — Melaro",
  description: "Sign in to your Melaro account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
