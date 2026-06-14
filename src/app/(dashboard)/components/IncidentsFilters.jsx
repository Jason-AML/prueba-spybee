"use client";

import { useCallback } from "react";
import styles from "../dashboard/IncidentsFilters.module.scss";

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

  return (
    <div className={styles.filtersCard}>
      <div className={styles.filtersRow}>
        <div className={styles.filtersGrid}>
          <label className={styles.filterBlock}>
            <span className={styles.filterLabel}>Estado</span>
            <select
              className={styles.select}
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

          <label className={styles.filterBlock}>
            <span className={styles.filterLabel}>Proyecto</span>
            <select
              className={styles.select}
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

          <label className={styles.filterBlock}>
            <span className={styles.filterLabel}>Prioridad</span>
            <select
              className={styles.select}
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

          <label className={styles.filterBlock}>
            <span className={styles.filterLabel}>Responsable</span>
            <select
              className={styles.select}
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

          <label className={styles.filterBlock}>
            <span className={styles.filterLabel}>Fecha</span>
            <select
              className={styles.select}
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
          className={styles.clearButton}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
