"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { useEffect } from "react";

function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light")
      document.documentElement.classList.remove("dark");
  }, []);
  return null;
}

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <ThemeInit />
        {children}
      </ToastProvider>
    </AuthProvider>
  );
}
