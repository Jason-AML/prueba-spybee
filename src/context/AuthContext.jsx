"use client";

import { createClient } from "@/lib/client";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({
  user: null,
  loading: true,
})

export function AuthProvider({ children, initialUser }) {
  const [user, setUser] = useState(initialUser)
  const [loading, setLoading] = useState(!initialUser)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)