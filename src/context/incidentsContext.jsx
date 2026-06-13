"use client";
import { createContext, useContext, useState } from "react";
import {incidents} from "../data/incidents.mock.js";
const IncidentContext = createContext(null);

export function IncidentProvider({ children }) {
  const [value, setValue] = useState(incidents.flat(Infinity));
  if (!value) {
    return null; // o un indicador de carga
  }
  return (
    <IncidentContext.Provider value={{ value, setValue }}>
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidentContext() {
  return useContext(IncidentContext);
}