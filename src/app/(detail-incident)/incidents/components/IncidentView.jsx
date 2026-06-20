"use client";

import IncidentMap from "../../../components/map/IncidentMap";
import Image from "next/image";
import MoreIncident from "./MoreIncident";
import { useIncidentStore } from "@/store/useIncidentStore";

const IncidentView = ({ idIncident }) => {
  const rawIncidents = useIncidentStore((state) => state.rawIncidents);
  const incident = rawIncidents.find((inc) => inc.id === idIncident);
  if (!incident) {
    return (
      <div className="p-6 bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl text-center">
        <p className="text-[#75777B]">Incidente no encontrado</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-[#042C53] text-[#85B7EB]",
      in_progress: "bg-[#412402] text-[#FAC775]",
      resolved: "bg-[#04342C] text-[#5DCAA5]",
      closed: "bg-[#04342C] text-[#5DCAA5]",
      on_hold: "bg-[#2C2C2A] text-[#B4B2A9]",
      on_paused: "bg-[#2C2C2A] text-[#B4B2A9]",
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-[#04342C] text-[#5DCAA5]",
      medium: "bg-[#412402] text-[#FAC775]",
      high: "bg-[#4A1B0C] text-[#F0997B]",
      critical: "bg-[#501313] text-[#F09595]",
    };
    return colors[priority] || colors.low;
  };

  const priorityLabels = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
    critical: "Crítica",
  };

  const statusLabels = {
    open: "Abierto",
    in_progress: "En Progreso",
    resolved: "Resuelto",
    closed: "Cerrado",
    on_hold: "En Espera",
    on_paused: "Pausado",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const contactButtonClass =
    "px-3 py-1 flex items-center gap-1 cursor-pointer bg-[#042C53] text-[#85B7EB] rounded hover:bg-[#0C447C] transition-colors text-sm font-medium";
  const reassignButtonClass =
    "px-3 py-1 flex items-center gap-1 cursor-pointer bg-[#4A1B0C] text-[#F0997B] rounded hover:bg-[#712B13] transition-colors text-sm font-medium";

  return (
    <div className="min-h-screen bg-[#0B0D10] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-semibold text-[#75777B]">
                  ID: {incident.sequenceId}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(incident.status)}`}
                >
                  {statusLabels[incident.status] ?? incident.status}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(incident.priority)}`}
                >
                  {priorityLabels[incident.priority] ?? incident.priority}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {incident.title}
              </h1>
              <p className="text-[#8E9094]">{incident.description}</p>
            </div>
            {incident.approval && (
              <div className="hidden lg:flex ml-2 bg-[#04342C] border-[0.5px] border-[#1D9E75] rounded px-3 py-1">
                <span className="text-sm font-semibold text-[#5DCAA5]">
                  ✓ Aprobado
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Main Details */}
          <div className="col-span-2">
            {/* Información General */}
            <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Información General
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#75777B] mb-1">
                    Tipo de Incidente
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {incident.type?.name ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#75777B] mb-1">Proyecto</p>
                  <p className="text-lg font-semibold text-white">
                    {incident.project?.name ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#75777B] mb-1">Ubicación</p>
                  <p className="text-lg font-semibold text-white">
                    {incident.locationDescription ?? "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[#75777B] mb-1">Coordenadas</p>
                  <p className="text-lg font-semibold text-white">
                    {incident.coordinates
                      ? `${incident.coordinates.lat}, ${incident.coordinates.lng}`
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
            {/*Mapa*/}
            <IncidentMap incident={incident} />

            {/* Responsables y Observadores */}
            <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">Equipo</h2>

              {/* Responsable */}
              <div className="mb-6">
                <p className="text-sm text-[#75777B] mb-3 font-semibold">
                  RESPONSABLE PRINCIPAL
                </p>
                {incident.owner ? (
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          incident.owner?.avatarUrl || "/default-avatar.webp"
                        }
                        alt={incident.owner.name}
                        width={42}
                        height={42}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">
                          {incident.owner.name}
                        </p>
                        <p className="text-sm text-[#75777B]">
                          {incident.owner.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap md:flex-nowrap">
                      <button
                        className={contactButtonClass}
                        type="button"
                        title="Contactar"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${incident.owner?.phone}`,
                            "_blank",
                          )
                        }
                      >
                        <span className="material-symbols-outlined text-sm">
                          contact_phone
                        </span>
                        Contactar
                      </button>
                      <button
                        className={reassignButtonClass}
                        type="button"
                        title="Reasignar"
                      >
                        <span className="material-symbols-outlined">sync</span>
                        Reasignar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-white">
                      No existe responsable
                    </h3>
                    <p className="text-[#8E9094] mb-3">Porfavor asigne uno</p>
                    <button
                      className="rounded-lg px-4 py-2 text-sm font-medium text-[#412402] bg-[#FAC775] hover:opacity-90 transition-opacity"
                      type="button"
                    >
                      Asignar
                    </button>
                  </div>
                )}
              </div>

              {/* Asignados */}
              {incident.assignees?.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-[#75777B] mb-3 font-semibold">
                    ASIGNADOS ({incident.assignees.length})
                  </p>
                  <div className="space-y-3">
                    {incident.assignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={assignee.avatarUrl}
                            alt={assignee.name}
                            width={42}
                            height={42}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white">
                              {assignee.name}
                            </p>
                            <p className="text-sm text-[#75777B]">
                              {assignee.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 item-center flex-wrap md:flex-nowrap">
                          <button
                            className={contactButtonClass}
                            type="button"
                            title="Contactar"
                          >
                            <span className="material-symbols-outlined text-sm">
                              contact_phone
                            </span>
                            Contactar
                          </button>
                          <button
                            className={reassignButtonClass}
                            type="button"
                            title="Reasignar"
                          >
                            <span className="material-symbols-outlined">
                              sync
                            </span>
                            Reasignar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observadores */}
              {incident.observers?.length > 0 && (
                <div>
                  <p className="text-sm text-[#75777B] mb-3 font-semibold">
                    OBSERVADORES ({incident.observers.length})
                  </p>
                  <div className="space-y-3">
                    {incident.observers.map((observer) => (
                      <div
                        key={observer.id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={observer.avatarUrl}
                            alt={observer.name}
                            width={42}
                            height={42}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-white">
                              {observer.name}
                            </p>
                            <p className="text-sm text-[#75777B]">
                              {observer.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap md:flex-nowrap">
                          <button
                            className={contactButtonClass}
                            type="button"
                            title="Contactar"
                          >
                            <span className="material-symbols-outlined text-sm">
                              contact_phone
                            </span>
                            Contactar
                          </button>
                          <button
                            className={reassignButtonClass}
                            type="button"
                            title="Reasignar"
                          >
                            <span className="material-symbols-outlined">
                              sync
                            </span>
                            Reasignar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Multimedia */}
            {incident.media?.length > 0 && (
              <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4">
                  Evidencia ({incident.media.length})
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {incident.media.map((media) => (
                    <div key={media.id} className="overflow-hidden rounded-lg">
                      <div className="bg-[#1C1F24] aspect-video flex items-center justify-center overflow-hidden">
                        {media.type === "image" ? (
                          <Image
                            src={media.url}
                            alt={media.name ?? "Imagen de prueba"}
                            width={42}
                            height={42}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={media.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <p className="text-sm text-[#C9CACC] mt-2 truncate">
                        {media.name}
                      </p>
                      <p className="text-xs text-[#75777B]">
                        {formatFileSize(media.size)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

         
          <div className="col-span-1">
            {/* Fechas */}
            <div className="bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-bold text-white mb-4">Cronología</h2>
              <div className="space-y-4">
                {incident.closingDate && (
                  <div>
                    <p className="text-sm text-[#75777B] mb-1">
                      Fecha de Cierre
                    </p>
                    <p className="font-semibold text-white">
                      {formatDate(incident.closingDate)}
                    </p>
                  </div>
                )}
                {incident.dueDate && (
                  <div>
                    <p className="text-sm text-[#75777B] mb-1">Fecha Límite</p>
                    <p className="font-semibold text-white">
                      {formatDate(incident.dueDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <MoreIncident project={incident.project?.id} />

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentView;
