"use client";

import { useCallback } from "react";

export const IncidentsFilters = ({ filters, options, onChange }) => {
  const handleChange = useCallback(
    (field) => (event) => {
      onChange({
        ...filters,
        [field]: event.target.value,
      });
    },
    [filters, onChange],
  );

  const selectClass =
    "mt-2 block w-full rounded-lg border-[0.5px] border-[#2A2D32] bg-[#1C1F24] px-3 py-2 text-sm text-[#E8E9EB] focus:border-[#378ADD] focus:outline-none focus:ring-2 focus:ring-[#0C447C]";
  const labelClass = "text-sm font-medium text-[#8E9094]";

  return (
    <div className="m-6 rounded-2xl bg-[#15171B] border-[0.5px] border-[#2A2D32] p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5">
          <label className="block">
            <span className={labelClass}>Estado</span>
            <select
              className={selectClass}
              value={filters.status}
              onChange={handleChange("status")}
            >
              <option value="">Todos</option>
              {options.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Proyecto</span>
            <select
              className={selectClass}
              value={filters.project}
              onChange={handleChange("project")}
            >
              <option value="">Todos</option>
              {options.projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Prioridad</span>
            <select
              className={selectClass}
              value={filters.priority}
              onChange={handleChange("priority")}
            >
              <option value="">Todos</option>
              {options.priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Responsable</span>
            <select
              className={selectClass}
              value={filters.owner}
              onChange={handleChange("owner")}
            >
              <option value="">Todos</option>
              {options.owners.map((owner) => (
                <option key={owner} value={owner}>
                  {owner}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={labelClass}>Fecha</span>
            <select
              className={selectClass}
              value={filters.dateRange}
              onChange={handleChange("dateRange")}
            >
              {options.dateRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={() =>
            onChange({
              status: "",
              project: "",
              priority: "",
              owner: "",
              dateRange: "",
            })
          }
          className="inline-flex shrink-0 items-center justify-center rounded-lg border-[0.5px] border-[#2A2D32] bg-[#1C1F24] px-4 py-2 text-sm font-medium text-[#C9CACC] transition hover:border-[#378ADD] hover:text-[#85B7EB] focus:outline-none focus:ring-2 focus:ring-[#0C447C]"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
