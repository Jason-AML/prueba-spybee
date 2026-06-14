import React from "react";
import IncidentView from "../../incidents/components/IncidentView";
import { incidents } from "../../../../data/incidents.mock";

const page = async ({ params }) => {
  const { id } = await params;
  //no filtrar, se debe pasar el ID al componente
  // Buscar el incidente en los datos mock
  const incidentData = incidents[0]?.find((incident) => incident.id === id);

  return <IncidentView incident={incidentData} />;
};

export default page;
