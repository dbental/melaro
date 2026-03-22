"use client";

import { useState } from "react";
import Link from "next/link";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { authClient } = await import("@/lib/auth-client");
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message ?? "Could not create account.");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-bg-elevated border border-card-border rounded-2xl p-8">
      <h1 className="font-heading text-2xl mb-2">Create your account</h1>
      <p className="text-fg-muted text-sm mb-8">
        Start orchestrating AI teams with Melaro
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-fg-muted mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-[10px] border border-card-border bg-bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-fg-dim focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-fg-muted mb-1.5"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[10px] border border-card-border bg-bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-fg-dim focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-fg-muted mb-1.5"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[10px] border border-card-border bg-bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-fg-dim focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-fg-muted mb-1.5"
          >
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-[10px] border border-card-border bg-bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-fg-dim focus:outline-none focus:ring-2 focus:ring-primary-deep focus:border-transparent transition-all"
            placeholder="Repeat your password"
          />
        </div>

        {error && (
          <p className="text-sm text-warm-deep bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-[10px] px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-br from-primary-deep to-accent-deep btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-fg-muted mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary-bright hover:text-primary transition-colors font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
