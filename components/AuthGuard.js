"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (!user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-100 text-slate-600 dark:bg-slate-950 dark:text-slate-400">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent dark:border-indigo-400"
          aria-hidden
        />
        <p className="text-sm">Loading FinTrack…</p>
      </div>
    );
  }

  return children;
}
