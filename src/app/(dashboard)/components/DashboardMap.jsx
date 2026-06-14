"use client"
import React from 'react'
import { useIncidentContext } from '@/context/incidentsContext'
import IncidentMap from '@/app/components/map/IncidentMap'
const DashboardMap = () => {
    const {filteredValue} = useIncidentContext()
  return (
    <IncidentMap incidents={filteredValue}/>
  )
}

export default DashboardMap
