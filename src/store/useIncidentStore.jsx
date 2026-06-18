import { create } from "zustand";
import { incidents as data } from "@/data/incidents.mock";
export const useIncidentStore = create((set) => ({
  rawIncidents: data.flat(Infinity),
  filteredIncidents: data.flat(Infinity),

  addIncident: (incident) =>
    set((state) => ({
      rawIncidents: [incident, ...state.rawIncidents],
    })),

  setFilteredIncidents: (data) =>
    set({
      filteredIncidents: data,
    }),
}));
