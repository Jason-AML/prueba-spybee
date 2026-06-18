"use client"

import { useIncidentStats } from "@/app/hooks/useIncidentStats"
import { useIncidentContext } from "@/context/incidentsContext"

const KpiDashboard = () => {
  const {value} = useIncidentContext()
  const {people} = useIncidentStats(value)
  const employees = people.length
  const total_incidents = value.length
  const closed = value.filter((inc)=>inc.status === "closed").length
  const open = value.filter((inc)=>inc.status === "open").length
  const cards = [
  {
    label: "Abiertas",
    key: "open",
    value: open,
    icon: "warning",
    iconBg: "#FAECE7",
    iconColor: "#D85A30",
   
  },
  {
    label: "Creadas",
    key: "created",
    value: total_incidents,
    icon: "add_circle",
    iconBg: "#E6F1FB",
    iconColor: "#378ADD",
    
  },
  {
    label: "Cerradas",
    key: "closed",
    value: closed,
    icon: "check_circle",
    iconBg: "#E1F5EE",
    iconColor: "#1D9E75",
    
  },
  {
    label: "Empleados",
    key: "employees",
    value: employees,
    icon: "people",
    iconBg: "#EEEDFE",
    iconColor: "#7F77DD",
   
  },
]
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
          <p className="text-2xl font-medium text-gray-800">{card?.[card.key] ?? card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default KpiDashboard