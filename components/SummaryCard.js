const accents = {
  balance:
    "border-t-indigo-500 dark:border-t-indigo-400 bg-gradient-to-b from-indigo-50/90 to-white dark:from-indigo-950/40 dark:to-slate-900/90",
  income:
    "border-t-emerald-500 dark:border-t-emerald-400 bg-gradient-to-b from-emerald-50/80 to-white dark:from-emerald-950/35 dark:to-slate-900/90",
  expense:
    "border-t-rose-500 dark:border-t-rose-400 bg-gradient-to-b from-rose-50/80 to-white dark:from-rose-950/30 dark:to-slate-900/90",
};

export default function SummaryCard({ title, value, hint, accent = "balance" }) {
  const accentClass = accents[accent] || accents.balance;

  return (
    <div
      className={`panel overflow-hidden border-t-4 p-5 transition-shadow hover:shadow-md ${accentClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-slate-50">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">{hint}</p>
      ) : null}
    </div>
  );
}
