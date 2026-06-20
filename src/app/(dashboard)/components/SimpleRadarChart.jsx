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

export default function SimpleRadarChart({ title, incidents = [], className=""}) {
  const { byType } = useIncidentStats(incidents);

  const data = Object.entries(byType).map(([key, value]) => ({
    subject: key,
    total: value,
  }));

  if (data.length < 3) {
    return (
      <div className="bg-surface/80  backdrop-blur-xl rounded-2xl  shadow-sm p-4 flex flex-col items-center justify-center h-70.5">
        {title && <h2 className="text-sm font-medium text-gray-500 mb-2">{title}</h2>}
        <p className="text-gray-400 text-sm">Se necesitan al menos 3 tipos de incidente para mostrar este gráfico.</p>
      </div>
    );
  }

  return (
    <div className={`bg-surface/80  backdrop-blur-xl rounded-2xl  shadow-2xl p-5 ${className}`}>
      {title && (
        <h2 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
          {title}
        </h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart outerRadius="75%" data={data}>
          <PolarGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
          />
          <Tooltip
            formatter={(value) => [value, "Incidentes"]}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              backgroundColor: "#1e293b",
              color: "#f8fafc",
              fontSize: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}
            labelStyle={{ color: "#94a3b8" }}
            itemStyle={{ color: "#f8fafc" }}
          />
          <Radar
            dataKey="total"
            stroke="#6366f1"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.15}
            dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#6366f1" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
