"use client";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
export const CustomBarChart = ({ title, incidents }) => {
  const { byPriority } = useIncidentStats(incidents);

  const data = Object.entries(byPriority).map(([key, value]) => ({
    name: PRIORITY_LABELS[key] ?? key,
    total: value,
    color: PRIORITY_COLORS[key] ?? "#6b7280",
  }));
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      {title && (
        <h2 className="text-center text-sm font-medium mb-2">{title}</h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 0, bottom: 0, left: 0 }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" barSize={20} fill="#413ea0" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
