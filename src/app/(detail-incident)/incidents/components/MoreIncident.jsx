"use client";
import { useIncidentContext } from "@/context/incidentsContext";
import Link from "next/link";

const MoreIncident = ({ project }) => {
  const { value: incidents } = useIncidentContext();

  const relatedIncidents = incidents  //filtramos
    .filter((incident) => incident?.project?.id === project)
    .slice(0, 5); //Obtenemos los primeros 5

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Más incidencias del proyecto</h2>

      {relatedIncidents.length === 0 ? (
        <p className="text-sm text-gray-500">No hay incidencias relacionadas con este proyecto.</p>
      ) : (
        <div className="space-y-4">
          {relatedIncidents.map((incident) => (
            <div key={incident.id} className="border border-gray-200 rounded-lg p-4  ">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm text-gray-500">Incidencia</p>
                  <p className="font-semibold text-gray-900">{incident.sequenceId} · {incident.title}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                  {incident.status === "open" ? "Abierta" : incident.status === "closed" ? "Cerrada" : "En progreso"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">Fecha de cierre</p>
                  <p className="font-semibold text-gray-900">{incident.closingDate ? new Date(incident.closingDate).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" }) : "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fecha límite</p>
                  <p className="font-semibold text-gray-900">{incident.dueDate ? new Date(incident.dueDate).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" }) : "-"}</p>
                </div>
                
              </div>
              <Link className="btn bg-amber-300" href={`/incidents/${incident.id}`}>Ver</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreIncident;
