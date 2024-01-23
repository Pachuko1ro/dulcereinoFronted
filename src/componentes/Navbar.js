import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css'

import { NavLink, useNavigate } from "react-router-dom";
import { accionLogin, accionUsuarioLogueado } from '../state/actions';
import { clearToken } from './Servicios/token';

export const Navbar = () => {
    const login = useSelector(state => state.login)
    const usuarioLogueado = useSelector(state => state.usuarioLogueado)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const navCarrito = ()=>{navigate('/carrito')}

    const { usuario, admin } = usuarioLogueado

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark separador-navbar">
            { !login && <NavLink className="navbar-brand" to="/">Login</NavLink> }
           
            { login &&
                <>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/inicio">Inicio</NavLink>
                            </li>
                            { admin &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/alta">Alta</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/carrito">Carrito</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/otra">Otra</NavLink>
                            </li>
                        </ul>
                    </div>

                    <button className="btn btn-info btn-sm" onClick={
                        () => {
                            dispatch(accionLogin(false))
                            dispatch(accionUsuarioLogueado('',false))
                            navigate('/')
                            clearToken()
                        }
                    }><b>{ usuario } ({admin?'ADMIN':'USER'}) Salir</b></button>
                    <button className="btn btn-light btn-sm" onClick={navCarrito} type="button"><i className="bi bi-cart"></i></button>
                </>                
            }
        </nav>
    )
}