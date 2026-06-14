import React from "react";
import IncidentView from "../../incidents/components/IncidentView";
import { incidents } from "../../../../data/incidents.mock";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";

const page = async ({ params }) => {
  const user = await getUser();
  if (!user) redirect("/login");
  const { id } = await params;
  //no filtrar, se debe pasar el ID al componente
  // Buscar el incidente en los datos mock
  const incidentData = incidents[0]?.find((incident) => incident.id === id);

  return <IncidentView incident={incidentData} />;
};

export default page;
