"use client";

import { useEffect, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400";

export default function TransactionModal({ open, mode, initial, onClose, onSave }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (mode === "edit" && initial) {
      setDate(initial.date);
      setAmount(String(initial.amount));
      setCategory(initial.category);
      setType(initial.type);
    } else {
      setDate("");
      setAmount("");
      setCategory("");
      setType("expense");
    }
  }, [open, mode, initial]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    const amt = Number(amount);
    if (!date || !category.trim() || !Number.isFinite(amt) || amt <= 0) return;
    setSubmitting(true);
    await onSave({ date, amount: amt, category, type });
    setSubmitting(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-200 dark:border-slate-700 dark:bg-slate-900"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {mode === "edit" ? "Edit transaction" : "Add transaction"}
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {mode === "edit"
            ? "Update the details below."
            : "Record income or an expense."}
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Amount
            <input
              type="number"
              min="0"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Category
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Groceries"
              className={`${inputClass} mt-1`}
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${inputClass} mt-1`}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Saving…" : mode === "edit" ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
