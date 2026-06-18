"use client"
import { useIncidentStore } from "@/store/useIncidentStore";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import SimpleRadarChart from "./SimpleRadarChart";

const DashboardStats = () => {
    const filteredIncidents = useIncidentStore(
    (state) => state.filteredIncidents,
  );
  return (
    <section aria-label="Estadísticas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <CustomBarChart title="Prioridad" incidents={filteredIncidents} />
            <CustomPieChart title="Estado" incidents={filteredIncidents}/>
            <SimpleRadarChart title="Tipo" incidents={filteredIncidents}/>
          </div>
        </section>

  )
}

export default DashboardStats
