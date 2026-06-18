"use client";
import { useIncidentStore } from "@/store/useIncidentStore";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import SimpleRadarChart from "./SimpleRadarChart";
import KpiDashboard from "./KpiDashboard";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const DashboardStats = () => {
  const filteredIncidents = useIncidentStore(
    (state) => state.filteredIncidents,
  );
  const { user } = useAuth();
  return (
    <section aria-label="Estadísticas" className="grid grid-cols-12 gap-2 ">
      <div className="hidden lg:block lg:col-span-4 bg-black rounded-2xl relative overflow-hidden">
        <Image
          src="/perfil_spybee.avif"
          alt="Imagen de perfil"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <h2 className="font-bold text-2xl">{user.email}</h2>
          <p>Ingeniero de obra</p>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12">
        <KpiDashboard />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <CustomBarChart
            title="Prioridad"
            className="bg-surface/80  backdrop-blur-xl lg:col-span-4 "
            incidents={filteredIncidents}
          />
          <CustomPieChart
            title="Estado"
            className="bg-surface/80  backdrop-blur-xl sm:hidden lg:block lg:col-span-3"
            incidents={filteredIncidents}
          />
          <SimpleRadarChart
            title="Tipo"
            className="bg-surface/80  backdrop-blur-xl lg:col-span-5"
            incidents={filteredIncidents}
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;
