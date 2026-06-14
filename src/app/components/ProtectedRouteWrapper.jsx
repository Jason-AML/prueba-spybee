'use client'

import { useProtectedRoute } from '@/app/hooks/useProtectedRoute'

export function ProtectedRouteWrapper({ children }) {
  const { isAuthenticated, loading } = useProtectedRoute()

  
  if (loading || !isAuthenticated) {
    return null
  }

  return children
}
