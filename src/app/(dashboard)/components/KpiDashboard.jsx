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

  const nextDue = sortedIncidents[0];
  const closed = incidents.filter((inc) => inc.status === "closed").length;

  const cards = [
    {
      label: "Incidencias por vencer",
      value: nextDue?.title ?? "Sin incidencias",
      dueDate: nextDue?.dueDate ? nextDue.dueDate.split("T")[0] : null,
      dueHref: nextDue ? `/incidents/${nextDue.id}` : null,
      icon: "warning",
      iconBg: "#4A1B0C",
      iconColor: "#F0997B",
      wide: true,
    },
    {
      label: "Creadas",
      value: total_incidents,
      icon: "add_circle",
      iconBg: "#042C53",
      iconColor: "#85B7EB",
    },
    {
      label: "Cerradas",
      value: closed,
      icon: "check_circle",
      iconBg: "#04342C",
      iconColor: "#5DCAA5",
    },
    {
      label: "Empleados",
      value: employees,
      icon: "people",
      iconBg: "#26215C",
      iconColor: "#AFA9EC",
    },
  ];

  return (
    <header className="mb-gutter">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-extrabold text-xl lg:text-4xl text-white">
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
            className={`rounded-2xl p-4 bg-[#15171B] border-[0.5px] border-[#2A2D32] ${
              card.wide ? "flex flex-col justify-between" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: card.iconBg }}
              >
                <span
                  className="material-symbols-outlined text-[18px] lg:text-[22px]"
                  style={{ color: card.iconColor }}
                >
                  {card.icon}
                </span>
              </div>
              <p className="text-xs lg:text-sm text-[#8E9094]">{card.label}</p>
            </div>

            <p className="text-sm lg:text-2xl font-medium text-white">
              {card.value}
            </p>

            {card.dueDate && (
              <Link
                href={card.dueHref}
                className="inline-block mt-2 rounded-md text-xs font-medium bg-[#4A1B0C] text-[#F5C4B3] px-2 py-1 w-fit hover:bg-[#5a2210] transition-colors"
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
