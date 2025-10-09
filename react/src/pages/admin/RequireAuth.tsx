import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/auth'

export default function RequireAuth({ children }: { children: React.ReactElement }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
