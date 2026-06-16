import DashboardMap from "../components/DashboardMap";
import IncidentsTable from "../components/IncidentsTable";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";
import CustomPieChart from "../components/CustomPieChart";
import CustomBarChart from "../components/CustomBarChart";
const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6'];
const DashboardPage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");
  const data = [
    { name: "Group A", value: 400, fill: COLORS[0] },
    { name: "Group B", value: 300, fill: COLORS[1] },
    { name: "Group C", value: 300, fill: COLORS[2] },
    { name: "Group D", value: 200, fill: COLORS[3] },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <CustomPieChart title="Incidencias por estado" data={data} />
        <CustomPieChart title="Incidencias por prioridad" data={data} />
        <CustomBarChart title="Prueba Bar"/>
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
   </>
  );
};

export default DashboardPage;
