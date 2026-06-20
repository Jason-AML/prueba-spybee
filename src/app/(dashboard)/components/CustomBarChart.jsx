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
  low: "#1D9E75",
  medium: "#FAC775",
  high: "#D85A30",
};

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { name, total, fill } = payload[0].payload;
  return (
    <div
      style={{
        backgroundColor: "#1F2227",
        border: "0.5px solid #2A2D32",
        borderRadius: "10px",
        padding: "8px 12px",
        fontSize: "12px",
        color: "#E8E9EB",
      }}
    >
      <span style={{ color: fill, fontWeight: 600 }}>{name}</span>
      <p style={{ margin: "2px 0 0", color: "#75777B" }}>
        Incidentes: <span style={{ color: "#E8E9EB" }}>{total}</span>
      </p>
    </div>
  );
};

export const CustomBarChart = ({ title, incidents, className = "" }) => {
  const { byPriority } = useIncidentStats(incidents);

  const data = Object.entries(byPriority).map(([key, value]) => ({
    name: PRIORITY_LABELS[key] ?? key,
    total: value,
    fill: PRIORITY_COLORS[key] ?? "#888780",
  }));

  return (
    <div
      className={`rounded-2xl p-5 bg-[#15171B] border-[0.5px] border-[#2A2D32] ${className}`}
    >
      {title && (
        <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
          {title}
        </h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
          <CartesianGrid stroke="#23262B" vertical={false} />
          <XAxis
            dataKey="name"
            scale="band"
            tick={{ fontSize: 12, fill: "#C9CACC", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#75777B" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "fill" }} />
          <Bar dataKey="total" barSize={36} radius={[6, 6, 0, 0]}>
           
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
