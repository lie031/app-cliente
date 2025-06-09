import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import MediaList from './Components/MediaList'
import MediaForm from './Components/MediaForm'
import MediaDetail from './Components/MediaDetails'
import { TypeView } from './Components/tipo/TypeView'
import TypeForm from './Components/tipo/TypeForm'
import ProductoraList from './Components/productora/ProductoraList'
import ProductoraForm from './Components/productora/ProductoraForm'
import DirectorView from './Components/director/DirectorView'
import DirectorForm from './Components/director/DirectorForm'
import GeneroView from './Components/genero/GeneroView'
import GeneroForm from './Components/genero/GeneroForm'
import Login from './Components/auth/Login'
import Registro from './Components/auth/Registro'
import RegistroAdmin from './Components/auth/RegistroAdmin'
import PrivateRoute from './Components/auth/PrivateRoute'


// Componentes para las otras paginas
//const Home = () => <div className='container'><h1>Pagina de Inicio</h1></div>

function App () {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main className='container'>
          <Routes>
            {/* Rutas públicas */}
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Registro />} />
            <Route path='/registro-admin' element={<RegistroAdmin />} />

            {/* Rutas protegidas */}
            <Route path='/' element={
              <PrivateRoute>
                <MediaList />
              </PrivateRoute>
            } />
            
            <Route path='/create' element={
              <PrivateRoute>
                <MediaForm />
              </PrivateRoute>
            } />
            
            <Route path='/medias/:_id' element={
              <PrivateRoute>
                <MediaForm />
              </PrivateRoute>
            } />
            
            <Route path='/medias/detail/:_id' element={
              <PrivateRoute>
                <MediaDetail />
              </PrivateRoute>
            } />

            <Route path='/tipos' element={
              <PrivateRoute>
                <TypeView />
              </PrivateRoute>
            } />
            
            <Route path='/tipos/create' element={
              <PrivateRoute>
                <TypeForm />
              </PrivateRoute>
            } />
            
            <Route path='/tipos/:_id' element={
              <PrivateRoute>
                <TypeForm />
              </PrivateRoute>
            } />

            <Route path='/productoras' element={
              <PrivateRoute>
                <ProductoraList />
              </PrivateRoute>
            } />
            
            <Route path='/productoras/create' element={
              <PrivateRoute>
                <ProductoraForm />
              </PrivateRoute>
            } />
            
            <Route path='/productoras/:_id' element={
              <PrivateRoute>
                <ProductoraForm />
              </PrivateRoute>
            } />

            <Route path='/directores' element={
              <PrivateRoute>
                <DirectorView />
              </PrivateRoute>
            } />
            
            <Route path='/directores/create' element={
              <PrivateRoute>
                <DirectorForm />
              </PrivateRoute>
            } />
            
            <Route path='/directores/:_id' element={
              <PrivateRoute>
                <DirectorForm />
              </PrivateRoute>
            } />

            <Route path='/generos' element={
              <PrivateRoute>
                <GeneroView />
              </PrivateRoute>
            } />
            
            <Route path='/generos/create' element={
              <PrivateRoute>
                <GeneroForm />
              </PrivateRoute>
            } />
            
            <Route path='/generos/:_id' element={
              <PrivateRoute>
                <GeneroForm />
              </PrivateRoute>
            } />

            {/* Redirección por defecto */}
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
