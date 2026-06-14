import DashboardMap from "../components/DashboardMap";
import IncidentsTable from "../components/IncidentsTable";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";
import styles from "./DashboardPage.module.scss";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <>
      <div className={styles.dashboardGrid}>
        {/* Cards de estadísticas */}
        <StatCard
          title="Usuarios Activos"
          value="213131"
          icon="👥"
          trend="+12%"
        />
        <StatCard title="Ingresos" value="23123123" icon="💰" trend="+8%" />
        <StatCard title="Proyectos" value="24" icon="📁" trend="+2%" />
        <StatCard title="Tareas" value="156" icon="✓" trend="-3%" />
      </div>
      <DashboardMap />
      {/* Sección de bienvenida */}
      <div className={styles.sectionCard}>
        <h2 className={styles.sectionTitle}>Historial de Incidencias</h2>
        <p className={styles.sectionText}>
          Puedes filtrar las incidencias por prioridad, estado, proyecto o
          responsable para encontrar rápidamente lo que buscas.
        </p>
        <IncidentsTable />
      </div>
    </>
  );
};

const StatCard = ({ title, value, icon, trend }) => {
  const isPositive = !trend.startsWith("-");

  return (
    <div className={styles.statCard}>
      <div className={styles.statCardHeader}>
        <div>
          <p className={styles.statTitle}>{title}</p>
          <p className={styles.statValue}>{value}</p>
          <p
            className={`${styles.statTrend} ${
              isPositive ? styles.statTrendPositive : styles.statTrendNegative
            }`}
          >
            {trend} desde el mes pasado
          </p>
        </div>
        <span className={styles.statIcon}>{icon}</span>
      </div>
    </div>
  );
};

export default DashboardPage;
