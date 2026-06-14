"use client";

import { useCallback } from "react";

export const IncidentsFilters = ({ filters, options, onChange }) => {
  const handleChange = useCallback((field) => (event) => {
    onChange({
      ...filters,
      [field]: event.target.value,
    });
  }, [filters, onChange]);

  return (
    <div className="m-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Estado</span>
            <select
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
            <span className="text-sm font-medium text-gray-700">Proyecto</span>
            <select
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
            <span className="text-sm font-medium text-gray-700">Prioridad</span>
            <select
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
            <span className="text-sm font-medium text-gray-700">Responsable</span>
            <select
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
            <span className="text-sm font-medium text-gray-700">Fecha</span>
            <select
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
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
          onClick={() => onChange({ status: "", project: "", priority: "", owner: "", dateRange: "" })}
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-amber-400 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-200"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
