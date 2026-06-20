"use client";
import { useIncidentStore } from "@/store/useIncidentStore";
import Link from "next/link";

const MoreIncident = ({ project }) => {
  const rawIncidents = useIncidentStore((state) => state.rawIncidents);
  const relatedIncidents = rawIncidents //filtramos
    .filter((incident) => incident?.project?.id === project)
    .slice(0, 5); //Obtenemos los primeros 5

  return (
    <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-6 mb-6">
      <h2 className="text-lg font-bold text-white mb-4">
        Más incidencias del proyecto
      </h2>

      {relatedIncidents.length === 0 ? (
        <p className="text-sm text-[#75777B]">
          No hay incidencias relacionadas con este proyecto.
        </p>
      ) : (
        <div className="space-y-4">
          {relatedIncidents.map((incident) => (
            <div
              key={incident.id}
              className="border-[0.5px] border-[#2A2D32] rounded-lg p-4 bg-[#1C1F24]"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm text-[#75777B]">Incidencia</p>
                  <p className="font-semibold text-white">
                    {incident.sequenceId} · {incident.title}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#2C2C2A] text-[#B4B2A9]">
                  {incident.status === "open"
                    ? "Abierta"
                    : incident.status === "closed"
                      ? "Cerrada"
                      : "En progreso"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-[#75777B]">Fecha de cierre</p>
                  <p className="font-semibold text-white">
                    {incident.closingDate
                      ? new Date(incident.closingDate).toLocaleDateString(
                          "es-ES",
                          { year: "numeric", month: "short", day: "numeric" },
                        )
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#75777B]">Fecha límite</p>
                  <p className="font-semibold text-white">
                    {incident.dueDate
                      ? new Date(incident.dueDate).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
              <Link
                className="inline-flex items-center justify-center mt-3 rounded-lg px-4 py-2 text-sm font-medium text-[#412402] bg-[#FAC775] hover:opacity-90 transition-opacity"
                href={`/incidents/${incident.id}`}
              >
                Ver
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreIncident;
