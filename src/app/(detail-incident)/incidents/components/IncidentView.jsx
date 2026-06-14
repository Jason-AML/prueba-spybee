"use client";

import IncidentMap from "../../../components/map/IncidentMap";
import Image from "next/image";
import MoreIncident from "./MoreIncident";
import styles from "./IncidentView.module.scss";

const IncidentView = ({ incident }) => {
  if (!incident) {
    return (
      <div className={styles.notFoundCard}>
        <p className={styles.notFoundText}>Incidente no encontrado</p>
      </div>
    );
  }

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

  const statusStyles = {
    open: styles.statusOpen,
    in_progress: styles.statusInProgress,
    closed: styles.statusClosed,
    on_hold: styles.statusOnHold,
  };

  const priorityStyles = {
    low: styles.priorityLow,
    medium: styles.priorityMedium,
    high: styles.priorityHigh,
    critical: styles.priorityCritical,
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

  return (
    <div className={styles.incidentView}>
      <div className={styles.contentWrapper}>
        <section className={styles.headerCard}>
          <div className={styles.headerRow}>
            <div className={styles.headerInfo}>
              <div className={styles.metaRow}>
                <span className={styles.idTag}>ID: {incident.sequenceId}</span>
                <span className={`${styles.metaTag} ${statusStyles[incident.status]}`}>
                  {statusLabels[incident.status]}
                </span>
                <span className={`${styles.metaTag} ${priorityStyles[incident.priority]}`}>
                  {priorityLabels[incident.priority]}
                </span>
              </div>
              <h1 className={styles.title}>{incident.title}</h1>
              <p className={styles.description}>{incident.description}</p>
            </div>
            {incident.approval && (
              <div className={styles.approvalBadge}>✓ Aprobado</div>
            )}
          </div>
        </section>

        <div className={styles.mainGrid}>
          <div className={styles.leftColumn}>
            <section className={styles.sectionCard}>
              <h2 className={styles.sectionHeading}>Información General</h2>
              <div className={styles.fieldGrid}>
                <div className={styles.fieldItem}>
                  <p className={styles.fieldLabel}>Tipo de Incidente</p>
                  <p className={styles.fieldValue}>{incident.type.name}</p>
                </div>
                <div className={styles.fieldItem}>
                  <p className={styles.fieldLabel}>Proyecto</p>
                  <p className={styles.fieldValue}>{incident.project.name}</p>
                </div>
                <div className={styles.fieldItem}>
                  <p className={styles.fieldLabel}>Ubicación</p>
                  <p className={styles.fieldValue}>{incident.locationDescription}</p>
                </div>
                <div className={styles.fieldItem}>
                  <p className={styles.fieldLabel}>Coordenadas</p>
                  <p className={styles.fieldValue}>
                    {incident.coordinates.lat}, {incident.coordinates.lng}
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.mapCard}>
              <IncidentMap incident={incident} />
            </section>

            <section className={styles.teamCard}>
              <h2 className={styles.sectionHeading}>Equipo</h2>

              <div className={styles.subSection}>
                <p className={styles.subTitle}>RESPONSABLE PRINCIPAL</p>
                {incident.owner ? (
                  <div className={styles.personCard}>
                    <div className={styles.personInfo}>
                      <Image
                        src={incident.owner?.avatarUrl || "/default-avatar.webp"}
                        alt={incident.owner.name}
                        width={42}
                        height={42}
                        className={styles.avatar}
                      />
                      <div className={styles.personMeta}>
                        <p className={styles.personName}>{incident.owner.name}</p>
                        <p className={styles.personDetail}>{incident.owner.email}</p>
                      </div>
                    </div>
                    <div className={styles.actionsRow}>
                      <button
                        className={`${styles.actionButton} ${styles.connectButton}`}
                        type="button"
                        title="Contactar"
                        onClick={() =>
                          window.open(`https://wa.me/${incident.owner?.phone}`, "_blank")
                        }
                      >
                        <span className={styles.icon}>contact_phone</span>
                        Contactar
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.reassignButton}`}
                        type="button"
                        title="Reasignar"
                      >
                        <span className={styles.icon}>sync</span>
                        Reasignar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyStateCard}>
                    <h3 className={styles.emptyStateTitle}>No existe responsable</h3>
                    <p className={styles.emptyStateText}>Por favor asigne uno</p>
                    <button className={styles.assignButton} type="button">
                      Asignar
                    </button>
                  </div>
                )}
              </div>

              {incident.assignees.length > 0 && (
                <div className={styles.subSection}>
                  <p className={styles.subTitle}>ASIGNADOS ({incident.assignees.length})</p>
                  <div className={styles.personList}>
                    {incident.assignees.map((assignee) => (
                      <div key={assignee.id} className={styles.personCard}>
                        <div className={styles.personInfo}>
                          <Image
                            src={assignee.avatarUrl}
                            alt={assignee.name}
                            width={42}
                            height={42}
                            className={styles.avatar}
                          />
                          <div className={styles.personMeta}>
                            <p className={styles.personName}>{assignee.name}</p>
                            <p className={styles.personDetail}>{assignee.email}</p>
                          </div>
                        </div>
                        <div className={styles.actionsRow}>
                          <button className={`${styles.actionButton} ${styles.connectButton}`} type="button" title="Contactar">
                            <span className={styles.icon}>contact_phone</span>
                            Contactar
                          </button>
                          <button className={`${styles.actionButton} ${styles.reassignButton}`} type="button" title="Reasignar">
                            <span className={styles.icon}>sync</span>
                            Reasignar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {incident.observers.length > 0 && (
                <div className={styles.subSection}>
                  <p className={styles.subTitle}>OBSERVADORES ({incident.observers.length})</p>
                  <div className={styles.personList}>
                    {incident.observers.map((observer) => (
                      <div key={observer.id} className={styles.personCard}>
                        <div className={styles.personInfo}>
                          <Image
                            src={observer.avatarUrl}
                            alt={observer.name}
                            width={42}
                            height={42}
                            className={styles.avatar}
                          />
                          <div className={styles.personMeta}>
                            <p className={styles.personName}>{observer.name}</p>
                            <p className={styles.personDetail}>{observer.email}</p>
                          </div>
                        </div>
                        <div className={styles.actionsRow}>
                          <button className={`${styles.actionButton} ${styles.connectButton}`} type="button" title="Contactar">
                            <span className={styles.icon}>contact_phone</span>
                            Contactar
                          </button>
                          <button className={`${styles.actionButton} ${styles.reassignButton}`} type="button" title="Reasignar">
                            <span className={styles.icon}>sync</span>
                            Reasignar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {incident.media.length > 0 && (
              <section className={styles.mediaCard}>
                <h2 className={styles.sectionHeading}>Evidencia ({incident.media.length})</h2>
                <div className={styles.mediaGrid}>
                  {incident.media.map((media) => (
                    <div key={media.id} className={styles.mediaItem}>
                      <div className={styles.mediaThumb}>
                        {media.type === "image" ? (
                          <Image
                            src={media.url}
                            alt={media.name}
                            width={42}
                            height={42}
                            className={styles.mediaImage}
                          />
                        ) : (
                          <video src={media.url} controls className={styles.mediaImage} />
                        )}
                      </div>
                      <p className={styles.mediaTitle}>{media.name}</p>
                      <p className={styles.mediaSize}>{formatFileSize(media.size)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className={styles.rightColumn}>
            <section className={styles.timelineCard}>
              <h2 className={styles.sectionHeading}>Cronología</h2>
              <div className={styles.timelineList}>
                {incident.closingDate && (
                  <div className={styles.timelineItem}>
                    <p className={styles.timelineLabel}>Fecha de Cierre</p>
                    <p className={styles.timelineValue}>{formatDate(incident.closingDate)}</p>
                  </div>
                )}
                {incident.dueDate && (
                  <div className={styles.timelineItem}>
                    <p className={styles.timelineLabel}>Fecha Límite</p>
                    <p className={styles.timelineValue}>{formatDate(incident.dueDate)}</p>
                  </div>
                )}
              </div>
            </section>

            <MoreIncident project={incident.project.id} />

            {incident.tags.length > 0 && (
              <section className={styles.tagsCard}>
                <h2 className={styles.sectionHeading}>Etiquetas</h2>
                <div className={styles.tagList}>
                  {incident.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className={styles.tagChip}
                      style={{
                        "--tag-bg": `${tag.color}20`,
                        "--tag-color": tag.color,
                        "--tag-border": tag.color,
                      }}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default IncidentView;
