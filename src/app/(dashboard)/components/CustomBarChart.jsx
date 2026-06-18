"use client";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIncidentStats } from "@/app/hooks/useIncidentStats";

const PRIORITY_LABELS = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

const PRIORITY_COLORS = {
  low: "#22c55e",
  medium: "#f59e0b",
  high: "#ef4444",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, total, fill } = payload[0].payload;
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "12px",
        color: "#f8fafc",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <span style={{ color: fill, fontWeight: 600 }}>{name}</span>
      <p style={{ margin: "2px 0 0", color: "#94a3b8" }}>
        Incidentes: <span style={{ color: "#f8fafc" }}>{total}</span>
      </p>
    </div>
  );
};

export const CustomBarChart = ({ title, incidents, className="" }) => {
  const { byPriority } = useIncidentStats(incidents);

  const data = Object.entries(byPriority).map(([key, value]) => ({
    name: PRIORITY_LABELS[key] ?? key,
    total: value,
    fill: PRIORITY_COLORS[key] ?? "#6b7280",
  }));

  return (
    <div className={`rounded-2xl  shadow-2xl p-5 ${className}`}>
      {title && (
        <h2 className="text-sm font-semibold text-black uppercase tracking-wide mb-4">
          {title}
        </h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 10, bottom: 0, left: -20 }}
        >
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="name"
            scale="band"
            tick={{ fontSize: 12, fill: "#000000", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#000000" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
          <Bar dataKey="total" barSize={36} radius={[6, 6, 0, 0]} fill="fill" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
