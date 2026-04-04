"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ToastContext = createContext(null);

const baseToast =
  "fixed left-1/2 top-4 z-[100] flex -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-opacity duration-300 sm:top-6";

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const value = useMemo(() => ({ showToast, toast }), [showToast, toast]);

  const toastClass =
    toast?.type === "error"
      ? `${baseToast} border border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/90 dark:text-red-100`
      : `${baseToast} border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/90 dark:text-emerald-100`;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div className={toastClass} role="status">
          {toast.message}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
