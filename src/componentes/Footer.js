import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Footer.css'
import { useDispatch, useSelector } from "react-redux";
import { clearToken, getToken } from "./Servicios/token";
import { validarTokenUsuario } from "./Servicios/usuarios";
import { accionLogin, accionUsuarioLogueado } from "../state/actions";


export const Footer =()=>{
    const login = useSelector(state => state.login)
    const dispatch = useDispatch()
  
  
    useEffect(() => {
      async function validar() {
        const token = getToken()
        console.log(token)
  
        const rta = await validarTokenUsuario(token)
        console.log(rta)
  
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
    

    return(
        <div className="Footer">
            <footer className="text-white  bg-dark">
                <div className="conteiner p-2">
                    <nav className="row ">
                      
                        <NavLink to='/inicio' className="col-12 col-md-3 d-flex justify-content-center align-items-center">
                            <img id="foot" src="https://pachuko.000webhostapp.com/img/logo.png" alt="" height={'40px'} />
                        </NavLink>
                        
                        <ul className="col-12 col-md-3 list-unstyled m-0" >
                            <li className="font-weight-bold mb-2 ">Encontranos en:</li>
                            <li className="text-center">
                                <p>Av. San Martín 3293, Florida</p>
                                <p>+54 11-2200-4756</p>
                            </li>
                            
                        </ul>
                        
                        <ul className="col-12 col-md-3 list-unstyled m-0">
                            <li className="font-weight-bold ">Seguinos</li>
                            <li className="text-center">
                                <i className="bi bi-facebook"/>
                                <i className="bi bi-instagram"/>
                            </li>
                            <li>
                                <i className="bi bi-whatsapp"/> 
                                <i className="bi bi-geo-alt-fill"/>
                            </li>
                            
                        </ul>      

                        <ul className="col-12 col-md-3 list-unstyled m-0 ">
                            <li className="font-weight-bold  ">Enlaces</li>
                            { login &&
                            <>
                                <li className="text-center"><NavLink className='text-reset mr-3' to='/inicio'>Inicio</NavLink><NavLink className='text-reset'  to='/alta'>Alta</NavLink></li>
                                <li className="text-center"><NavLink className='text-reset mr-3' to='/carrito'>Carrito</NavLink><NavLink className='text-reset' to='/contacto'>Contacto</NavLink></li>
                                <li className="text-center"><NavLink className='text-reset mr-3' to='/nosotros'>Nosotros</NavLink><NavLink className='text-reset' to='/otra'>Otra</NavLink></li>
                            </>
                            }
                        </ul>                        
                    </nav>
                </div>
            </footer>
        </div>
    )
}

