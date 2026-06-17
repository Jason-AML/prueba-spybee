"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useIncidentStats } from "@/app/hooks/useIncidentStats";

export default function SimpleRadarChart({ title, incidents = [] }) {
  const { byType } = useIncidentStats(incidents);

  const data = Object.entries(byType).map(([key, value]) => ({
    subject: key,
    total: value,
  }));
if (data.length < 3) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col items-center justify-center h-70.5">
      {title && <h2 className="text-sm font-medium mb-2">{title}</h2>}
      <p className="text-gray-400 text-sm">Se necesitan al menos 3 tipos de incidente para mostrar este gráfico.</p>
    </div>
  );
}
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      {title && (
        <h2 className="text-center text-sm font-medium mb-2">{title}</h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#334155" }} />
          <Tooltip
            formatter={(value) => [value, "Incidentes"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #334155" }}
          />
          <Radar
            dataKey="total"
            stroke="#334155"
            fill="#FFD54F"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
