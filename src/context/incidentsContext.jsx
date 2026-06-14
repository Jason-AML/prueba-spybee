"use client";
import { createContext, useContext, useState } from "react";
import { incidents } from "../data/incidents.mock.js";

const IncidentContext = createContext(null);

export function IncidentProvider({ children }) {
  const [rawIncidents, setRawIncidents] = useState(incidents.flat(Infinity));
  const [filteredIncidents, setFilteredIncidents] = useState(rawIncidents);

  if (!rawIncidents) return null;

  return (
    <IncidentContext.Provider
      value={{
        value: rawIncidents,           
        setValue: setRawIncidents,     
        filteredValue: filteredIncidents,    
        setFilteredValue: setFilteredIncidents,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidentContext() {
  return useContext(IncidentContext);
}