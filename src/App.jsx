import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login.jsx';
import Registrar from './pages/Registrar.jsx';
import OlvidePassword from './pages/OlvidePassword';
import NuevoPassword from './pages/NuevoPassword';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import Inicio from './pages/Inicio';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layouts/RutaProtegida';
import Equipos from './pages/Equipos';
import { EquipoProvider } from './context/EquipoProvider';
import Equipo from './pages/Equipo';


function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <EquipoProvider>
            <Routes>
                <Route path='/' element={ <AuthLayout /> }>
                    <Route index element={ <Inicio />} />
                    <Route path='login' element={ <Login/> } />
                    <Route path='registrar' element={ <Registrar/> } />
                    <Route path='olvide-password' element={ <OlvidePassword/> } />
                    <Route path='olvide-password/:token' element={ <NuevoPassword/> } />
                    <Route path='confirmar/:id' element={ <ConfirmarCuenta/> } />
                </Route>

                <Route path='/equipos' element={<RutaProtegida/>}>
                  <Route index element={<Equipos/>} />
                  <Route path=':id' element={<Equipo/>} />

                </Route>
            </Routes>
          </EquipoProvider>
        </AuthProvider>
      </BrowserRouter>
             
    </>
  )
}

export default App
