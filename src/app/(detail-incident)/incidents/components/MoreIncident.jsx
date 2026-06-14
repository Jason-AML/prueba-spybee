"use client";
import { useIncidentContext } from "@/context/incidentsContext";
import Link from "next/link";
import styles from "./MoreIncident.module.scss";

const MoreIncident = ({ project }) => {
  const { value: incidents } = useIncidentContext();

  const relatedIncidents = incidents
    .filter((incident) => incident?.project?.id === project)
    .slice(0, 5);

  return (
    <aside className={styles.relatedCard}>
      <h2 className={styles.title}>Más incidencias del proyecto</h2>

      {relatedIncidents.length === 0 ? (
        <p className={styles.emptyText}>No hay incidencias relacionadas con este proyecto.</p>
      ) : (
        <div className={styles.relatedList}>
          {relatedIncidents.map((incident) => (
            <article key={incident.id} className={styles.incidentItem}>
              <div className={styles.relatedHeader}>
                <div className={styles.incidentInfo}>
                  <p className={styles.label}>Incidencia</p>
                  <p className={styles.incidentTitle}>
                    {incident.sequenceId} · {incident.title}
                  </p>
                </div>
                <span className={styles.statusBadge}>
                  {incident.status === "open"
                    ? "Abierta"
                    : incident.status === "closed"
                    ? "Cerrada"
                    : "En progreso"}
                </span>
              </div>
              <div className={styles.metaGroup}>
                <div>
                  <p className={styles.label}>Fecha de cierre</p>
                  <p className={styles.value}>
                    {incident.closingDate
                      ? new Date(incident.closingDate).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className={styles.label}>Fecha límite</p>
                  <p className={styles.value}>
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
              <Link className={styles.viewLink} href={`/incidents/${incident.id}`}>
                Ver
              </Link>
            </article>
          ))}
        </div>
      )}
    </aside>
  );
};

export default MoreIncident;
