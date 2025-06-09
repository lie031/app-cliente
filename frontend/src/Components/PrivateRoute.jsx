import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Si la ruta requiere admin y el usuario no es admin, redirigir a /media
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/media" />
  }

  // Si el usuario es normal y no está en /media, redirigir a /media
  if (user.role !== 'admin' && window.location.pathname !== '/media') {
    return <Navigate to="/media" />
  }

  return children
}

export default PrivateRoute 