import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import MediaList from './Components/MediaList'
import MediaForm from './Components/MediaForm'
import { TypeView } from './Components/tipo/TypeView'
import TypeForm from './Components/tipo/TypeForm'
import { DirectorView } from './Components/director/DirectorView'
import DirectorForm from './Components/director/DirectorForm'
import GeneroView from './Components/genero/GeneroView'
import GeneroForm from './Components/genero/GeneroForm'

// Componentes para las otras paginas
const Home = () => <div className='container'><h1>Pagina de Inicio</h1></div>

function App () {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />} />

            <Route path='/medias' element={<MediaList />} />
            <Route path='/create' element={<MediaForm />} />
            <Route path='/medias/:_id' element={<MediaForm />} />

            <Route path='/tipos' element={<TypeView />} />
            <Route path='/tipos/create' element={<TypeForm />} />
            <Route path='/tipos/:_id' element={<TypeForm />} />

            <Route path='/directores' element={<DirectorView />} />
            <Route path='/directores/create' element={<DirectorForm />} />
            <Route path='/directores/:_id' element={<DirectorForm />} />

            <Route path='/generos' element={<GeneroView />} />
            <Route path='/generos/create' element={<GeneroForm />} />
            <Route path='/generos/:_id' element={<GeneroForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
