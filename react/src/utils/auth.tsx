import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  user: string | null
  token: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_TOKEN_KEY = 'keten_admin_token'
const AUTH_USER_KEY = 'keten_admin_user'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(AUTH_TOKEN_KEY))
  const [user, setUser] = useState<string | null>(() => localStorage.getItem(AUTH_USER_KEY))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, user)
    } else {
      localStorage.removeItem(AUTH_USER_KEY)
    }
  }, [user])

  async function login(username: string, password: string) {
    // Minimal local auth for now: check against a fixed password stored in env or fallback
    // Replace this with server-side authentication when backend is available.
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
    if (password === expected) {
      const fakeToken = 'local-fake-token-' + Date.now()
      setToken(fakeToken)
      setUser(username)
      return true
    }
    return false
  }

  function logout() {
    setToken(null)
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthProvider
