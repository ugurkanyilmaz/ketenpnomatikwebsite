import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/auth'

export default function AdminLogin() {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/admin'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const ok = await auth.login(username, password)
    if (ok) {
      navigate(from, { replace: true })
    } else {
      setError('Kullanıcı adı veya şifre hatalı')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Girişi</h2>
        <form onSubmit={onSubmit}>
          <label className="label">Kullanıcı</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="input w-full mb-3" />
          <label className="label">Şifre</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full mb-3" />
          {error && <div className="text-red-500 mb-3">{error}</div>}
          <div className="flex gap-3">
            <button className="btn btn-primary" type="submit">Giriş Yap</button>
            <a className="btn btn-link" href="/">Siteye Dön</a>
          </div>
        </form>
      </div>
    </div>
  )
}
