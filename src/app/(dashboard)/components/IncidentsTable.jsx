"use client";
import { useEffect, useMemo, useState } from "react";
import { useIncidentContext } from "../../../context/incidentsContext";
import DataTable from "./DataTable";
import { IncidentsFilters } from "./IncidentsFilters";
import styles from "../dashboard/IncidentsTable.module.scss";

const formatDate = (d) => {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

const priorityColors = {
  low: styles.badgeLow,
  medium: styles.badgeMedium,
  high: styles.badgeHigh,
};

const statusColors = {
  open: styles.badgeOpen,
  resolved: styles.badgeResolved,
  closed: styles.badgeClosed,
};

const Badge = ({ value, colors }) => {
  const normalized = value?.toLowerCase();
  const badgeClass = colors[normalized] ?? styles.badge;

  return (
    <span className={`${styles.badge} ${badgeClass}`}>
      {value ?? "-"}
    </span>
  );
};

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
  const context = useIncidentContext();
  const incidents = useMemo(() => {
    const raw = context?.value ?? [];
    return Array.isArray(raw) && raw.length && Array.isArray(raw[0]) ? raw.flat() : raw;
  }, [context]);

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
    window.localStorage.setItem("spybee-incident-filters", JSON.stringify(filters));
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
        if (filters.project && incident.project?.name !== filters.project) return false;
        if (filters.priority && incident.priority !== filters.priority) return false;
        if (filters.owner && incident.owner?.name !== filters.owner) return false;
        if (filters.dateRange) {
          const createdAt = incident.createdAt ? new Date(incident.createdAt) : null;
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

  return (
    <div className={styles.container}>
      <IncidentsFilters filters={filters} options={options} onChange={setFilters} />
      <div className={styles.panel}>
        <div className={styles.statusText}>
          {filteredIncidents.length === 0
            ? "No hay incidencias que coincidan con los filtros actuales."
            : `Mostrando ${filteredIncidents.length} incidencias.`}
        </div>
        <DataTable columns={columns} data={filteredIncidents} />
      </div>
    </div>
  );
}
