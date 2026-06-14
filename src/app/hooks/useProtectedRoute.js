'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export function useProtectedRoute() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    
    if (loading) return

    
    if (!user) {
      router.push('/login')
    }
  }, [user, loading, router])

  
  const isAuthenticated = !loading && !!user

  return { user, loading, isAuthenticated }
}
