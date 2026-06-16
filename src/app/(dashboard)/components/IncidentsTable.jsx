"use client";
import { useEffect, useMemo, useState } from "react";
import { useIncidentContext } from "../../../context/incidentsContext";
import DataTable from "./DataTable";
import { IncidentsFilters } from "./IncidentsFilters";

const formatDate = (d) => {
  //validamos
  if (!d) return "-";
  try {
    //transformamos a fecha legible, si no es una fecha válida, devolvemos el valor original.
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

//Definicion de colores
const priorityColors = {
  low: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-red-500 text-white",
};

const statusColors = {
  open: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-700",
};

const Badge = ({ value, colors }) => (
  <span
    className={`px-2 py-1  rounded-full text-xs font-medium ${
      colors[value?.toLowerCase()] ?? "bg-gray-100 text-gray-700"
    }`}
  >
    {value ?? "-"}
  </span>
);
const columns = [
  { key: "sequenceId", label: "#" },
  { key: "title", label: "Título" },
  {
    key: "priority",
    label: "Prioridad",
    render: (row) => <Badge value={row.priority} colors={priorityColors} />,
  },
  {
    key: "status",
    label: "Estado",
    render: (row) => <Badge value={row.status} colors={statusColors} />,
  },
  {
    key: "project",
    label: "Proyecto",
    render: (row) => row.project?.name ?? "-",
  },
  {
    key: "owner",
    label: "Responsable",
    render: (row) => row.owner?.name ?? "-",
  },
  {
    key: "createdAt",
    label: "Creado",
    render: (row) => formatDate(row.createdAt),
  },
];

export default function IncidentsTable() {
  const { value, filteredValue, setFilteredValue } = useIncidentContext();
  const incidents = useMemo(() => {
    const raw = value ?? [];
    return Array.isArray(raw) && raw.length && Array.isArray(raw[0])
      ? raw.flat()
      : raw;
  }, [value]);

  //iniciamos con filtros por defecto para mostrar solo incidencias abiertas de alta prioridad, para facilitar la identificación de problemas críticos sin necesidad de configurar filtros inicialmente
  const [filters, setFilters] = useState({
    status: "open",
    project: "",
    priority: "high",
    owner: "",
    dateRange: "",
  });
  // Al cargar el componente, intentamos recuperar los filtros guardados en localStorage para mantener la persistencia de la experiencia del usuario entre sesiones. Si no hay filtros guardados, se mantienen los valores por defecto.
  useEffect(() => {
    const saved = window.localStorage.getItem("spybee-incident-filters");
    if (!saved) return;

    try {
      // Validamos que el contenido sea un JSON válido antes de intentar parsearlo
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        setFilters({                      //en caso que el parsed no tenga los campos, enviamos un string vacio para evitar null
          status: parsed.status || "",
          project: parsed.project || "",  
          priority: parsed.priority || "",
          owner: parsed.owner || "",
          dateRange: parsed.dateRange || "",
        });
      }
    } catch (error) {
      console.warn("No se pudo leer filtros guardados:", error);
    }
  }, []);

  useEffect(() => {
    //guardamos solo filtros, así evitamos guardar datos de la tabla ya filtrada
    window.localStorage.setItem(
      "spybee-incident-filters",
      JSON.stringify(filters),
    );
  }, [filters]);

  const options = useMemo(() => {
    // Extrae y ordena las opciones únicas para cada filtro
    //En supabase podríamos hacer esto con consultas específicas para cada campo, asi si agregamos un registro nuevo con un valor diferente, automáticamente aparecerá en los filtros sin necesidad de actualizar el código.
    const statuses = Array.from(
      new Set(incidents.map((item) => item.status).filter(Boolean)),
    ).sort();
    const priorities = Array.from(
      new Set(incidents.map((item) => item.priority).filter(Boolean)),
    ).sort();
    const projects = Array.from(
      new Set(incidents.map((item) => item.project?.name).filter(Boolean)),
    ).sort();
    const owners = Array.from(
      new Set(incidents.map((item) => item.owner?.name).filter(Boolean)),
    ).sort();
    //Como no tenemos un campo específico de fecha, usamos rangos predefinidos para filtrar por fecha de creación. Haria lo mismo con o sin supabase, ya que es una lógica de filtrado común en el cliente.
    return {
      statuses,
      priorities,
      projects,
      owners,
      dateRanges: [
        { value: "", label: "Todos" },
        { value: "7", label: "Últimos 7 días" },
        { value: "30", label: "Últimos 30 días" },
        { value: "90", label: "Últimos 90 días" },
      ],
    };
  }, []);
  // El filtro en el cliente ya que no tenemos una API. En caso de tener muchos registros usaria un filtrado en el servidor.
  const filteredIncidents = useMemo(
    () =>
      incidents.filter((incident) => {
        if (filters.status && incident.status !== filters.status) return false;
        if (filters.project && incident.project?.name !== filters.project)
          return false;
        if (filters.priority && incident.priority !== filters.priority)
          return false;
        if (filters.owner && incident.owner?.name !== filters.owner)
          return false;
        if (filters.dateRange) {
          const createdAt = incident.createdAt
            ? new Date(incident.createdAt)
            : null;
          if (!createdAt || Number.isNaN(createdAt.getTime())) return false;

          const days = Number(filters.dateRange);
          const cutoff = new Date();
          cutoff.setHours(0, 0, 0, 0);
          cutoff.setDate(cutoff.getDate() - days);

          if (createdAt < cutoff) return false;
        }
        return true;
      }),
    [incidents, filters],
  );
  useEffect(() => {
    setFilteredValue(filteredIncidents);
  }, [filteredIncidents]);
  return (
    <div>
      <IncidentsFilters
        filters={filters}
        options={options}
        onChange={setFilters}
      />
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 text-sm text-gray-600">
          {filteredIncidents.length === 0
            ? "No hay incidencias que coincidan con los filtros actuales."
            : `Mostrando ${filteredIncidents.length} incidencias.`}
        </div>
        <DataTable columns={columns} data={filteredIncidents} />
      </div>
    </div>
  );
}
