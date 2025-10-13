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
    // Try server-side authentication first (will accept hashed or plaintext DB values and
    // upgrade plaintext values to hashed). If the API is unreachable, fall back to local env check.
    try {
      const res = await fetch('/php/api/admin_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data?.ok) {
          setToken(data.token ?? 'server-fake-' + Date.now())
          setUser(data.user?.email ?? username)
          return true
        }
        // server responded with 200 but credentials rejected
        return false
      } else {
        // If server explicitly returned 401 Unauthorized, treat it as definitive invalid credentials
        if (res.status === 401) {
          return false
        }
        // For other non-2xx responses (server error), fall through to fallback behavior below
      }
    } catch (e) {
      // network error or server unreachable — do NOT fallback to local credentials
      return false
    }
    // If we reach here without returning, fall through as failure
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
