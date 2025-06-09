import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Registro from './components/Registro'
import RegistroAdmin from './components/RegistroAdmin'
import MediaList from './components/MediaList'
import GeneroList from './components/GeneroList'
import DirectorList from './components/DirectorList'
import ProductoraList from './components/ProductoraList'
import TipoList from './components/TipoList'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/registro-admin" element={<RegistroAdmin />} />
              
              {/* Rutas protegidas para usuarios normales */}
              <Route path="/media" element={
                <PrivateRoute>
                  <MediaList />
                </PrivateRoute>
              } />

              {/* Rutas protegidas solo para administradores */}
              <Route path="/generos" element={
                <PrivateRoute requireAdmin={true}>
                  <GeneroList />
                </PrivateRoute>
              } />
              <Route path="/directores" element={
                <PrivateRoute requireAdmin={true}>
                  <DirectorList />
                </PrivateRoute>
              } />
              <Route path="/productoras" element={
                <PrivateRoute requireAdmin={true}>
                  <ProductoraList />
                </PrivateRoute>
              } />
              <Route path="/tipos" element={
                <PrivateRoute requireAdmin={true}>
                  <TipoList />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App 