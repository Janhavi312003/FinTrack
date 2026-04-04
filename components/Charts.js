"use client";

import {
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PIE_COLORS = [
  "#4f46e5",
  "#059669",
  "#0284c7",
  "#d97706",
  "#e11d48",
  "#7c3aed",
];

const tooltipStyle = {
  borderRadius: 10,
  border: "1px solid rgb(226 232 240)",
  boxShadow: "0 4px 12px rgb(15 23 42 / 0.08)",
};

export default function Charts({ lineData, pieData }) {
  const noLine = !lineData?.length;
  const noPie = !pieData?.length;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="panel p-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Balance over time
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Running balance from your activity
        </p>
        {noLine ? (
          <p className="py-14 text-center text-sm text-slate-500 dark:text-slate-400">
            Add transactions to see your balance trend.
          </p>
        ) : (
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`$${Number(v).toFixed(2)}`, "Balance"]}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#4338ca" }}
                  name="Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="panel p-5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Spending by category
        </h2>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          Expense breakdown
        </p>
        {noPie ? (
          <p className="py-14 text-center text-sm text-slate-500 dark:text-slate-400">
            No expense data yet.
          </p>
        ) : (
          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={44}
                  outerRadius={76}
                  paddingAngle={2}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, i) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => `$${Number(v).toFixed(2)}`}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
