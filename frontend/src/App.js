import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MediaList from './Components/MediaList';

//Componentes para las otras paginas
const Home = () => <div className='container'><h1>Pagina de Inicio</h1></div>
const Services = () => <div className='container'><h1>Servicios</h1></div>

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main className='container'>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/medias' element ={<MediaList/>} />
              <Route></Route>
              <Route></Route>
          </Routes>
        </main>
    </div>
    </BrowserRouter>
  );
}

export default App;
