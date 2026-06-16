import DashboardMap from "../components/DashboardMap";
import IncidentsTable from "../components/IncidentsTable";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Historial de Incidencias
        </h2>
        <p className="text-gray-600">
          Puedes filtrar las incidencias por prioridad, estado, proyecto o
          responsable para encontrar rápidamente lo que buscas.
        </p>
        <IncidentsTable />
      </div>
      <DashboardMap/>
   </>
  );
};

const StatCard = ({ title, value, icon, trend }) => {
  const isPositive = !trend.startsWith("-");

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          <p
            className={`text-sm mt-2 ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {trend} desde el mes pasado
          </p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
};

export default DashboardPage;
