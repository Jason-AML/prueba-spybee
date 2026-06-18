import { useMemo } from "react";

export function useIncidentStats(incidents) {
  console.log("useIncidentStats ejecutado");
console.log("total incidencias:", incidents.length);
  return useMemo(() => {
    const byStatus = {};
    const byPriority = {};
    const byType = {};
    const peopleMap = {};
    const byProject = {};
    for (const incident of incidents) {
      byStatus[incident.status] = (byStatus[incident.status] ?? 0) + 1;
      byPriority[incident.priority] = (byPriority[incident.priority] ?? 0) + 1;

      const typeName = incident.type.name;
      byType[typeName] = (byType[typeName] ?? 0) + 1;

      if (incident.owner) {
        peopleMap[incident.owner.id] = incident.owner;
      }
      if (incident.project) {
        byProject[incident.project.id] = incident.project; 
      }
      for (const person of incident.assignees ?? []) {
        peopleMap[person.id] = person;
      }

      for (const person of incident.observers ?? []) {
        peopleMap[person.id] = person;
      }
    }

    return {
      total: incidents.length,
      byStatus,
      byPriority,
      byType,
      people: Object.values(peopleMap),
      projects: Object.values(byProject),
    };
  }, [incidents]);
}
