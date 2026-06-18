"use client";

import { Pie, PieChart, Sector, Tooltip, ResponsiveContainer } from "recharts";
import { useIncidentStats } from "@/app/hooks/useIncidentStats";

const renderActiveShape = ({
  cx, cy, midAngle, innerRadius, outerRadius,
  startAngle, endAngle, fill, payload, percent, value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 1));
  const cos = Math.cos(-RADIAN * (midAngle ?? 1));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      {/* Label central */}
      <text x={cx} y={cy} dy={-6} textAnchor="middle" fill="#1e293b" fontSize={13} fontWeight={600}>
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={14} textAnchor="middle" fill="#94a3b8" fontSize={12}>
        {value} incidentes
      </text>

      {/* Sector principal */}
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius}
        startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.9} />

      {/* Anillo exterior activo */}
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />

      {/* Línea de etiqueta */}
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} strokeWidth={1.5} fill="none" />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />

      {/* Textos de etiqueta */}
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
        fill="#1e293b" fontSize={13} fontWeight={600}>
        {value}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor}
        fill="#94a3b8" fontSize={11}>
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const STATUS_LABELS = {
  open: "Abierta",
  closed: "Cerrada",
  on_paused: "Pausada",
};

const STATUS_COLORS = {
  open: "#22c55e",
  closed: "#f59e0b",
  on_paused: "#ef4444",
};

export default function CustomPieChart({ isAnimationActive = true, title, incidents = [] }) {
  const { byStatus } = useIncidentStats(incidents);

  const data = Object.entries(byStatus).map(([key, value]) => ({
    name: STATUS_LABELS[key] ?? key,
    total: value,
    fill: STATUS_COLORS[key] ?? "#6b7280",
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {title && (
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          {title}
        </h2>
      )}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="total"
            isAnimationActive={isAnimationActive}
          />
          <Tooltip content={() => null} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}