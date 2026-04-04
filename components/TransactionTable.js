"use client";

import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionContext";
import { useState } from "react";
import TransactionModal from "@/components/TransactionModal";

const inputClass =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-indigo-400";

export default function TransactionTable() {
  const { isAdmin } = useAuth();
  const {
    filteredTransactions,
    categories,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [modal, setModal] = useState({ open: false, mode: "add", item: null });

  const empty = filteredTransactions.length === 0;

  function openAdd() {
    setModal({ open: true, mode: "add", item: null });
  }

  function openEdit(t) {
    setModal({ open: true, mode: "edit", item: t });
  }

  function closeModal() {
    setModal((m) => ({ ...m, open: false }));
  }

  async function handleSave(row) {
    if (modal.mode === "edit" && modal.item) {
      await updateTransaction(modal.item.id, row);
    } else {
      await addTransaction(row);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex flex-col gap-4 border-b border-slate-200/90 bg-slate-50/90 p-4 dark:border-slate-800 dark:bg-slate-900/50 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Transactions
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Search, filter by type and category, sort results
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {isAdmin ? (
            <button
              type="button"
              onClick={openAdd}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400/35"
            >
              Add transaction
            </button>
          ) : null}
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`${inputClass} w-full min-w-[10rem] sm:w-44`}
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={inputClass}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={inputClass}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={inputClass}
          >
            <option value="date-desc">Date (newest)</option>
            <option value="date-asc">Date (oldest)</option>
            <option value="amount-desc">Amount (high)</option>
            <option value="amount-asc">Amount (low)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-100/80 dark:border-slate-800 dark:bg-slate-950/80">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Date
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Category
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                Type
              </th>
              {isAdmin ? (
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {empty ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-4 py-14 text-center text-slate-500 dark:text-slate-400"
                >
                  <p className="font-medium text-slate-700 dark:text-slate-300">
                    No transactions to show
                  </p>
                  <p className="mt-1 text-sm">
                    Adjust filters or add your first entry.
                  </p>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-slate-100 transition-colors hover:bg-indigo-50/40 dark:border-slate-800 dark:hover:bg-slate-800/40"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-200">
                    {t.date}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold tabular-nums ${
                      t.type === "income"
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}$
                    {Number(t.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-100">
                    {t.category}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                        t.type === "income"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  {isAdmin ? (
                    <td className="space-x-3 px-4 py-3 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEdit(t)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Delete this transaction?")) {
                            deleteTransaction(t.id);
                          }
                        }}
                        className="text-sm font-medium text-rose-600 hover:text-rose-800 dark:text-rose-400"
                      >
                        Delete
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal
        open={modal.open}
        mode={modal.mode}
        initial={modal.item}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
}
