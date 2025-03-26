<<<<<<< HEAD
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
=======
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MediaList from './Components/MediaList';
import MediaForm from './Components/MediaForm';
import { TypeView } from './Components/tipo/TypeView';
import TypeForm from './Components/tipo/TypeForm';
import ProductoraList from './Components/productora/ProductoraList';
import ProductoraForm from './Components/productora/ProductoraForm';
>>>>>>> 4c3768b4552d41597586e69aed9b3bb503d9dfae

// Componentes para las otras paginas
const Home = () => <div className='container'><h1>Pagina de Inicio</h1></div>

function App () {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main className='container'>
          <Routes>

              <Route path='/' element={<Home/>}></Route>
              
              <Route path='/medias' element ={<MediaList/>} />
              <Route path='/create' element ={<MediaForm/>} />
              <Route path='/medias/:_id' element = {<MediaForm />} />

              <Route path='/tipos' element = {<TypeView />} />
              <Route path='/tipos/create' element = {<TypeForm />} />
              <Route path='/tipos/:_id' element = {<TypeForm />} />

              <Route path='/productoras' element={<ProductoraList />} />
              <Route path='/productoras/create' element={<ProductoraForm />} />
              <Route path='/productoras/:_id' element={<ProductoraForm />} />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
