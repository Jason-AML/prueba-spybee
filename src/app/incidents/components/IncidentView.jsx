"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import IncidentMap from "./IncidentMap";
const IncidentView = ({ incident }) => {
    

  const mapContainer = useRef(null);
  const map = useRef(null);
  if (!incident) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500">Incidente no encontrado</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      open: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      closed: "bg-green-100 text-green-800",
      on_hold: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.open;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      critical: "bg-red-100 text-red-800",
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
    closed: "Cerrado",
    on_hold: "En Espera",
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

  // Inicializar Mapbox
  useEffect(() => {
    if (!incident || !mapContainer.current) return;

    // Set access token
   mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // Crear mapa
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [incident.coordinates.lng, incident.coordinates.lat],
      zoom: 15,
    });

    // Agregar marcador
    new mapboxgl.Marker({ color: "#EF4444" })
      .setLngLat([incident.coordinates.lng, incident.coordinates.lat])
      .addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [incident]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-semibold text-gray-500">
                  ID: {incident.sequenceId}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(incident.status)}`}>
                  {statusLabels[incident.status]}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(incident.priority)}`}>
                  {priorityLabels[incident.priority]}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {incident.title}
              </h1>
              <p className="text-gray-600">
                {incident.description}
              </p>
            </div>
            {incident.approval && (
              <div className="ml-4 bg-green-50 border border-green-200 rounded px-3 py-1">
                <span className="text-sm font-semibold text-green-800">✓ Aprobado</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Left Column - Main Details */}
          <div className="col-span-2">
            {/* Información General */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información General
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tipo de Incidente</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {incident.type.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Proyecto</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {incident.project.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ubicación</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {incident.locationDescription}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Coordenadas</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {incident.coordinates.lat}, {incident.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
            {/*Mapa*/}
            <IncidentMap incident={incident} />

            {/* Responsables y Observadores */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Equipo
              </h2>
              
              {/* Responsable */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-3 font-semibold">
                  RESPONSABLE PRINCIPAL
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={incident.owner.avatarUrl}
                    alt={incident.owner.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {incident.owner.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {incident.owner.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Asignados */}
              {incident.assignees.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3 font-semibold">
                    ASIGNADOS ({incident.assignees.length})
                  </p>
                  <div className="space-y-3">
                    {incident.assignees.map((assignee) => (
                      <div key={assignee.id} className="flex items-center gap-4">
                        <img
                          src={assignee.avatarUrl}
                          alt={assignee.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {assignee.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {assignee.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Observadores */}
              {incident.observers.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-3 font-semibold">
                    OBSERVADORES ({incident.observers.length})
                  </p>
                  <div className="space-y-3">
                    {incident.observers.map((observer) => (
                      <div key={observer.id} className="flex items-center gap-4">
                        <img
                          src={observer.avatarUrl}
                          alt={observer.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {observer.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {observer.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Multimedia */}
            {incident.media.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Evidencia ({incident.media.length})
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {incident.media.map((media) => (
                    <div key={media.id} className="overflow-hidden rounded-lg">
                      <div className="bg-gray-100 aspect-video flex items-center justify-center overflow-hidden">
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt={media.name}
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
                      <p className="text-sm text-gray-600 mt-2 truncate">
                        {media.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(media.size)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Timeline & Info */}
          <div className="col-span-1">
            {/* Fechas */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Cronología
              </h2>
              <div className="space-y-4">
                {incident.closingDate && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fecha de Cierre</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(incident.closingDate)}
                    </p>
                  </div>
                )}
                {incident.dueDate && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Fecha Límite</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(incident.dueDate)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Etiquetas */}
            {incident.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Etiquetas
                </h2>
                <div className="space-y-2">
                  {incident.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="px-3 py-2 rounded text-sm font-semibold"
                      style={{
                        backgroundColor: tag.color + "20",
                        color: tag.color,
                        border: `1px solid ${tag.color}`,
                      }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentView;
