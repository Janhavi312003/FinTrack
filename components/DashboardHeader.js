"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function DashboardHeader({ onMenuClick }) {
  const { user, isAdmin } = useAuth();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleDark() {
    const next = !document.documentElement.classList.contains("dark");
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    setDark(next);
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-3 border-b border-slate-200/90 bg-white/90 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {user ? (
          <div className="hidden max-w-[14rem] truncate text-right sm:block">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
              {user.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        ) : null}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            isAdmin
              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          {isAdmin ? "Admin" : "Viewer"}
        </span>
        <button
          type="button"
          onClick={toggleDark}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900 sm:text-sm"
        >
          {dark ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
