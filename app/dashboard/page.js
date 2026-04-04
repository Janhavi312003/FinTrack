"use client";

import Charts from "@/components/Charts";
import Insights from "@/components/Insights";
import SummaryCard from "@/components/SummaryCard";
import TransactionTable from "@/components/TransactionTable";
import { useAuth } from "@/context/AuthContext";
import { useTransactions } from "@/context/TransactionContext";
import { useMemo } from "react";

function formatMoney(n) {
  return `$${Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function buildLineData(transactions) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  let balance = 0;
  return sorted.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;
    return { date: t.date, balance: Math.round(balance * 100) / 100 };
  });
}

function buildPieData(transactions) {
  const map = {};
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    map[t.category] = (map[t.category] || 0) + t.amount;
  }
  return Object.entries(map).map(([name, value]) => ({
    name,
    value: Math.round(value * 100) / 100,
  }));
}

function monthKey(isoDate) {
  const d = new Date(isoDate);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function sumExpensesInMonth(transactions, key) {
  return transactions
    .filter((t) => t.type === "expense" && monthKey(t.date) === key)
    .reduce((s, t) => s + t.amount, 0);
}

function downloadCsv(transactions) {
  const header = ["Date", "Amount", "Category", "Type"];
  const lines = [header.join(",")];
  for (const t of transactions) {
    const cat = `"${String(t.category).replace(/"/g, '""')}"`;
    lines.push([t.date, t.amount, cat, t.type].join(","));
  }
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fintrack-transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 w-48 rounded-lg bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-72 rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-72 rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { isAdmin } = useAuth();
  const { transactions, loading } = useTransactions();

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    for (const t of transactions) {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    }
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const lineData = useMemo(() => buildLineData(transactions), [transactions]);
  const pieData = useMemo(() => buildPieData(transactions), [transactions]);

  const insightItems = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const incomeVs = `Total income ${formatMoney(totals.income)} vs expenses ${formatMoney(totals.expense)}.`;

    if (!expenses.length) {
      return [
        incomeVs,
        "No expenses yet — add spending to see category insights.",
      ];
    }

    let topCat = null;
    let topAmt = 0;
    const byCat = {};
    for (const t of expenses) {
      byCat[t.category] = (byCat[t.category] || 0) + t.amount;
    }
    for (const [cat, amt] of Object.entries(byCat)) {
      if (amt > topAmt) {
        topAmt = amt;
        topCat = cat;
      }
    }

    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;

    const thisSpend = sumExpensesInMonth(transactions, thisMonth);
    const lastSpend = sumExpensesInMonth(transactions, lastMonth);

    let compare = `This month’s expenses: ${formatMoney(thisSpend)}. Last month: ${formatMoney(lastSpend)}.`;
    if (lastSpend > 0) {
      const pct = Math.round(((thisSpend - lastSpend) / lastSpend) * 100);
      compare += ` About ${pct >= 0 ? "+" : ""}${pct}% vs last month.`;
    }

    return [
      `Highest spending category: ${topCat} (${formatMoney(topAmt)}).`,
      compare,
      incomeVs,
    ];
  }, [transactions, totals.income, totals.expense]);

  if (loading && transactions.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <div className="flex flex-col gap-4 border-l-4 border-indigo-500 pl-4 sm:flex-row sm:items-end sm:justify-between dark:border-indigo-400">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Overview
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-400">
            Balances, trends, and cash flow — all stored locally for this demo.
          </p>
        </div>
        {isAdmin ? (
          <button
            type="button"
            onClick={() => downloadCsv(transactions)}
            className="self-start rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Export CSV
          </button>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Total balance"
          value={formatMoney(totals.balance)}
          accent="balance"
        />
        <SummaryCard
          title="Total income"
          value={formatMoney(totals.income)}
          accent="income"
        />
        <SummaryCard
          title="Total expenses"
          value={formatMoney(totals.expense)}
          accent="expense"
        />
      </div>

      <Charts lineData={lineData} pieData={pieData} />

      <Insights items={insightItems} />

      {!isAdmin ? (
        <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-sm text-slate-700 dark:border-sky-900 dark:bg-sky-950/30 dark:text-slate-300">
          You&apos;re signed in as <strong>viewer</strong>. Ask an admin to
          upgrade your role in this demo if you need to edit data.
        </div>
      ) : null}

      <TransactionTable />
    </div>
  );
}
