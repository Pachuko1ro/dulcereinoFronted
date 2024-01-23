import './App.css';

import { Navbar } from './componentes/Navbar';
import { NavSerch } from './componentes/NavSerch';
import { Footer } from './componentes/Footer';

import { Index as Inicio } from './componentes/INICIO/Index';
import { Index as Alta } from './componentes/ALTA/Index';
import { Index as Carrito } from './componentes/CARRITO/Index';
import { Index as Contacto } from './componentes/CONTACTO/Index';
import { Index as Nosotros } from './componentes/NOSOTROS/Index';
import { Index as Otra } from './componentes/OTRA/Index';

import { RutaNoValida } from './componentes/RutaNoValida';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './componentes/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearToken, getToken } from './componentes/Servicios/token';
import { validarTokenUsuario } from './componentes/Servicios/usuarios';
import { accionLogin, accionUsuarioLogueado } from './state/actions';


function App() {

  const login = useSelector(state => state.login)
  const dispatch = useDispatch()


  useEffect(() => {

    async function validar() {
      const token = getToken()

      const rta = await validarTokenUsuario(token)

      if(!rta.error) {
        dispatch(accionLogin(true))
        dispatch(accionUsuarioLogueado(rta.decoded.usuario, rta.decoded.admin))
      }
      else {
        clearToken()
      }
    }
    validar()
  },[dispatch])
  

  return (
    <div className="App">
      <div className="container-fluid p-0">
        <div className="jumbotron">
          
          <BrowserRouter>
            <NavSerch/> 
            <Navbar />

            <Routes>
              <Route index element={<Login />} />
              { login &&
                <>
                  <Route path='inicio' element={<Inicio titulo="Inicio" />} />
                  <Route path='alta' element={<Alta titulo="Alta" />} />
                  <Route path='carrito' element={<Carrito titulo="Carrito" />} />
                  <Route path='contacto' element={<Contacto titulo="Contacto" />} />
                  <Route path='nosotros' element={<Nosotros titulo="Nosotros" />} />
                  <Route path='otra' element={<Otra titulo="Otra" />} />
                </>
              }
              <Route path='*' element={<RutaNoValida />} />
            </Routes>
            
            <Footer/>
                
          </BrowserRouter>

        </div>
      </div>
    </div>
  );
}

export default App;
