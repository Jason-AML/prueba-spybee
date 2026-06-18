const cards = [
  {
    label: "Abiertas",
    key: "open",
    value: 14,
    icon: "warning",
    iconBg: "#FAECE7",
    iconColor: "#D85A30",
    trend: "+3 esta semana",
    trendType: "down",
  },
  {
    label: "Creadas",
    key: "created",
    value: 38,
    icon: "add_circle",
    iconBg: "#E6F1FB",
    iconColor: "#378ADD",
    trend: "Igual que ayer",
    trendType: "neutral",
  },
  {
    label: "Cerradas",
    key: "closed",
    value: 24,
    icon: "check_circle",
    iconBg: "#E1F5EE",
    iconColor: "#1D9E75",
    trend: "+5 esta semana",
    trendType: "up",
  },
  {
    label: "Empleados",
    key: "employees",
    value: 87,
    icon: "people",
    iconBg: "#EEEDFE",
    iconColor: "#7F77DD",
    trend: "Sin cambios",
    trendType: "neutral",
  },
]

const KpiDashboard = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
            style={{ background: card.iconBg }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18, color: card.iconColor }}
            >
              {card.icon}
            </span>
          </div>
          <p className="text-xs text-gray-400 mb-1">{card.label}</p>
          <p className="text-2xl font-medium text-gray-800">{stats?.[card.key] ?? card.value}</p>
          <p className={`text-xs mt-1 ${card.trendType === "up" ? "text-emerald-600" : card.trendType === "down" ? "text-red-500" : "text-gray-400"}`}>
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  )
}

export default KpiDashboard