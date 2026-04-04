"use client";

import { useAuth } from "@/context/AuthContext";
import { hasAnyUsers } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (user) {
      router.replace("/dashboard");
      return;
    }
    if (!hasAnyUsers()) router.replace("/signup");
    else router.replace("/login");
  }, [ready, user, router]);

  return (
    <div className="auth-shell flex flex-col items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400"
        aria-hidden
      />
      <p className="text-sm">Redirecting…</p>
    </div>
  );
}
