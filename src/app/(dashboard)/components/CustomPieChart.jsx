"use client"

import { Pie, PieChart, Sector, Tooltip, ResponsiveContainer} from 'recharts';

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
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={(outerRadius ?? 0) + 6} outerRadius={(outerRadius ?? 0) + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {value}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${((percent ?? 1) * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

export default function CustomPieChart({ isAnimationActive = true, title, data = [] }) {
  return (
    <div className='bg-white rounded-2xl shadow-3xs'>
      {title && <h2 className="text-center text-sm font-medium mb-2">{title}</h2>}
      <ResponsiveContainer width="100%" height={250}>
        <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
          <Pie
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill=""
            dataKey="value"
            isAnimationActive={isAnimationActive}
          />
          <Tooltip content={() => null} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}