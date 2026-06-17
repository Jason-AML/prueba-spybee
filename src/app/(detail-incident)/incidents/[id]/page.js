import React from "react";
import IncidentView from "../../incidents/components/IncidentView";
import { redirect } from "next/navigation";
import { getUser } from "@/services/auth/auth.server";

const page = async ({ params }) => {
  const user = await getUser();
  if (!user) redirect("/login");
  const { id } = await params;
  return <IncidentView idIncident={id} />;
};

export default page;
