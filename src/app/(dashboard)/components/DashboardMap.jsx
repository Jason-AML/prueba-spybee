"use client"
import React from 'react'
import { useIncidentStore } from '@/store/useIncidentStore'
import IncidentMap from '@/app/components/map/IncidentMap'
const DashboardMap = () => {
    const filteredIncidents = useIncidentStore(
        (state) => state.filteredIncidents,
      );
  return (
    <IncidentMap incidents={filteredIncidents}/>
  )
}

export default DashboardMap
