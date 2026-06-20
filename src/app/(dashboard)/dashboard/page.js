import DashboardMap from "../components/DashboardMap";
import IncidentsTable from "../components/IncidentsTable";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";
import DashboardStats from "../components/DashboardStats";

const DashboardPage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");
  return (
    <>
      <div className="flex flex-col gap-5">
        <DashboardStats />
        <section aria-label="Historial de incidencias">
          <div className="mt-8 bg-[#15171B] border-[0.5px] border-[#2A2D32] rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Historial de Incidencias
            </h2>
            <p className="text-gray-600">
              Puedes filtrar las incidencias por prioridad, estado, proyecto o
              responsable para encontrar rápidamente lo que buscas.
            </p>
            {/* Tabla incidencias */}
            <IncidentsTable />
          </div>
        </section>
        <section aria-label="Mapa de incidencias">
          <DashboardMap />
        </section>
      </div>
    </>
  );
};

export default DashboardPage;
