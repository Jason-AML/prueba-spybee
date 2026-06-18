"use client"
import { useIncidentContext } from "@/context/incidentsContext";
import CustomBarChart from "./CustomBarChart";
import CustomPieChart from "./CustomPieChart";
import SimpleRadarChart from "./SimpleRadarChart";

const DashboardStats = () => {
    const {filteredValue }= useIncidentContext()
  return (
    <section aria-label="Estadísticas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <CustomBarChart title="Prioridad" incidents={filteredValue} />
            <CustomPieChart title="Estado" incidents={filteredValue}/>
            <SimpleRadarChart title="Tipo" incidents={filteredValue}/>
          </div>
        </section>

  )
}

export default DashboardStats
