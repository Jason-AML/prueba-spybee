"use client";

import { useIncidentStats } from "@/app/hooks/useIncidentStats";
import { useIncidentStore } from "@/store/useIncidentStore";
import { useAuth } from "@/context/AuthContext";
import { ModalControl } from "@/app/components/modal/ModalControl";
import NewIncident from "@/app/components/modal/content/NewIncident";
import Link from "next/link";

const KpiDashboard = () => {
  const { user } = useAuth();
  const incidents = useIncidentStore((stats) => stats.rawIncidents);
  const { people } = useIncidentStats(incidents);
  const employees = people.length;
  const total_incidents = incidents.length;
  const now = new Date();

  const sortedIncidents = incidents
    .filter(
      (incident) =>
        incident.status === "open" &&
        incident.dueDate &&
        new Date(incident.dueDate) >= now,
    )
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const closed = incidents.filter((inc) => inc.status === "closed").length;

  const cards = [
    {
      label: "Incidencias por vencer",
      key: "open",
      value: sortedIncidents[0]?.title ?? "Sin incidencias",
      dueDate: sortedIncidents[0].dueDate.split("T")[0],
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
  ];
  return (
    <header className="mb-gutter">
      <div className="flex justify-between">
        <h1 className="font-extrabold text-xl lg:text-4xl text-on-surface mb-6">
          Bienvenido, {user.email.split("@")[0]}
        </h1>
        <ModalControl action="Nueva Incidencia">
          <NewIncident />
        </ModalControl>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className=" rounded-2xl  shadow-2xl p-4 bg-surface/80  backdrop-blur-xl"
          >
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
            <p className="text-2xl font-medium text-gray-800">
              {card?.[card.key] ?? card.value}
            </p>
            {card.dueDate && (
              <Link
                href={`/incidents/${sortedIncidents[0]?.id}`}
                className="rounded-2xl bg-red-400/80  text-center px-2"
              >
                Vence: {card.dueDate}
              </Link>
            )}
          </div>
        ))}
      </div>
    </header>
  );
};

export default KpiDashboard;
