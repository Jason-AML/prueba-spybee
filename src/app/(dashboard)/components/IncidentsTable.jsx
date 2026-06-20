"use client";
import { useEffect, useMemo, useState } from "react";
import { useIncidentStore } from "@/store/useIncidentStore";
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


const priorityColors = {
  low: "bg-[#04342C] text-[#5DCAA5]",
  medium: "bg-[#412402] text-[#FAC775]",
  high: "bg-[#4A1B0C] text-[#F0997B]",
};

const statusColors = {
  open: "bg-[#042C53] text-[#85B7EB]",
  resolved: "bg-[#04342C] text-[#5DCAA5]",
  closed: "bg-[#2C2C2A] text-[#B4B2A9]",
};

const Badge = ({ value, colors }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs font-medium ${
      colors[value?.toLowerCase()] ?? "bg-[#2C2C2A] text-[#B4B2A9]"
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
  const incidents = useIncidentStore((state) => state.rawIncidents);
  const setFilteredIncidents = useIncidentStore(
    (state) => state.setFilteredIncidents,
  );

  const [filters, setFilters] = useState({
    status: "open",
    project: "",
    priority: "high",
    owner: "",
    dateRange: "",
  });

  useEffect(() => {
    const saved = window.localStorage.getItem("spybee-incident-filters");
    if (!saved) return;

    try {
      
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        setFilters({
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
    
    try {
      window.localStorage.setItem(
        "spybee-incident-filters",
        JSON.stringify(filters),
      );
    } catch (error) {
      console.warn("No se pudo guardar filtros:", error);
    }
  }, [filters]);

  const options = useMemo(() => {
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
  }, [incidents]);
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
    setFilteredIncidents(filteredIncidents);
  }, [filteredIncidents, setFilteredIncidents]);

  return (
    <div>
      <IncidentsFilters
        filters={filters}
        options={options}
        onChange={setFilters}
      />
      <div className="rounded-2xl bg-[#15171B] border-[0.5px] border-[#2A2D32] p-4">
        <div className="mb-4 text-sm text-[#8E9094]">
          {filteredIncidents.length === 0
            ? "No hay incidencias que coincidan con los filtros actuales."
            : `Mostrando ${filteredIncidents.length} incidencias.`}
        </div>
        <DataTable columns={columns} data={filteredIncidents} />
      </div>
    </div>
  );
}
