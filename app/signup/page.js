"use client";

import { useAuth } from "@/context/AuthContext";
import { validateSignup } from "@/lib/validators";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fieldBase =
  "mt-1 w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 shadow-sm transition focus:outline-none focus:ring-2 dark:bg-slate-950 dark:text-slate-100";

export default function SignupPage() {
  const { user, ready, register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (user) router.replace("/dashboard");
  }, [ready, user, router]);

  function fieldClass(nameKey) {
    const err = errors[nameKey];
    return `${fieldBase} ${
      err
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/25 dark:border-red-500"
        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 dark:border-slate-600 dark:focus:border-indigo-400"
    }`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setApiError("");
    const v = validateSignup({ name, email, password, role });
    setErrors(v.errors);
    if (!v.valid) return;

    setSubmitting(true);
    const result = await register({
      name,
      email,
      password,
      role,
    });
    setSubmitting(false);

    if (!result.ok) {
      setApiError(result.error);
      return;
    }

    router.push("/login?registered=1");
  }

  if (!ready) {
    return (
      <div className="auth-shell flex items-center justify-center text-slate-600 dark:text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400"
            aria-hidden
          />
          <p className="text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (user) return null;

  return (
    <div className="auth-shell flex flex-col items-center justify-center px-4 py-12">
      <div className="panel w-full max-w-md p-8 shadow-lg transition-shadow duration-300 dark:shadow-black/40">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-md">
            F
          </span>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              Create your account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Join FinTrack — demo data stays in your browser
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Full name
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass("name")}
            />
            {errors.name ? (
              <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass("email")}
            />
            {errors.email ? (
              <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Password
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass("password")}
            />
            {errors.password ? (
              <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                {errors.password}
              </span>
            ) : (
              <span className="mt-1 block text-xs text-slate-500">
                At least 6 characters
              </span>
            )}
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Role
            </legend>
            <div className="mt-2 flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="role"
                  checked={role === "viewer"}
                  onChange={() => setRole("viewer")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Viewer (read-only)
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="radio"
                  name="role"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                Admin (full access)
              </label>
            </div>
            {errors.role ? (
              <span className="mt-1 block text-xs text-red-600 dark:text-red-400">
                {errors.role}
              </span>
            ) : null}
          </fieldset>

          {apiError ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
              {apiError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-60"
          >
            {submitting ? "Creating account…" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
