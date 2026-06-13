"use client"
import React from 'react'
import { useIncidentContext } from '@/context/incidentsContext'
import IncidentMap from '@/app/components/map/IncidentMap'
const DashboardMap = () => {
    const {value:incidents} = useIncidentContext()
  return (
    <IncidentMap incidents={incidents}/>
  )
}

export default DashboardMap
