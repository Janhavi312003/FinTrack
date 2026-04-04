export default function Insights({ items }) {
  return (
    <div className="panel border-l-4 border-l-indigo-500 p-5 dark:border-l-indigo-400">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Insights
      </h2>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
        Quick takeaways from your activity
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((text, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm text-slate-700 dark:text-slate-300"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"
              aria-hidden
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
