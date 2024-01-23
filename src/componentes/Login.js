import { useEffect, useState } from 'react'
import './Login.css'

import * as servicio from './Servicios/usuarios'
import { accionLogin, accionUsuarioLogueado } from '../state/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearToken, setToken } from './Servicios/token'
import { Carousel } from 'react-bootstrap'

export function Login() {

    const [anchoVentana, setAnchoVentana] = useState(window.innerWidth)
    const actualizarAnchoVentana = () => {
    setAnchoVentana(window.innerWidth)
    }
    useEffect(() => {
    window.addEventListener('resize', actualizarAnchoVentana);
    
    return () => {
      window.removeEventListener('resize', actualizarAnchoVentana);
    };
    }, [])
    
    const [ credenciales, setCredenciales ] = useState({ usuario: '', password: '', admin: false })
    const [ modoRegister, setModoRegister ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit = async e => {
        e.preventDefault()
        // Modo login
        if(!modoRegister) {
            const rta = await servicio.loginUsuario(credenciales)

            const { status, usuario, admin, token } = rta
            if(status === 'loginOk') {
                dispatch(accionLogin(true))
                dispatch(accionUsuarioLogueado(usuario,admin))
                setToken(token)
                navigate('/inicio')
            }
            else {
                dispatch(accionLogin(false))
                dispatch(accionUsuarioLogueado('',false))
                clearToken()
            }
        }
        //Modo register
        else {
            const rta = await servicio.registerUsuario(credenciales)
            console.log(rta)
            setModoRegister(false)
            navigate('/')
        }
        setCredenciales({ usuario: '', password: '', admin: false })
    }

    const { usuario, password, admin } = credenciales

    return (
        <div className="Login">
            <div className="jumbotron">
                <div className='row'>
                    <div className={anchoVentana>=750?"col-4":"col-12"}>
                    <h2>{modoRegister? 'Registrarse':'Ingresar'}</h2>
                    <hr />
                    <form className={anchoVentana>=750?"w-75":""} onSubmit={onSubmit}>
                        {/* --- campo usuario --- */}
                        <div className="form-group">
                            <label htmlFor="usuario">usuario</label>
                            <input id="usuario" className="form-control" type="text" value={usuario} onChange={
                                e => setCredenciales({...credenciales, usuario: e.target.value})
                            } />
                        </div>

                        {/* --- campo password --- */}
                        <div className="form-group">
                            <label htmlFor="password">password</label>
                            <input id="password" className="form-control" type="text" value={password} onChange={
                                e => setCredenciales({...credenciales, password: e.target.value})
                            } />
                        </div>

                        {/* --- campo admin --- */}
                        { modoRegister &&
                        <div className="form-group form-check">
                            <input id="admin" className="form-check-input" type="checkbox" checked={admin} onChange={
                                e => setCredenciales({...credenciales, admin: e.target.checked})
                            } />
                            <label htmlFor="admin">admin</label>
                        </div>
                        }

                        <input type="submit" className={`btn btn-${modoRegister? 'danger':'success'} m-2`} value={modoRegister? 'Registrarse':'Ingresar'} />
                        <input type="button" className="btn btn-warning m-2" value={modoRegister? 'Ir a Ingresar':'Ir a Registrarse'} onClick={
                            () => setModoRegister(!modoRegister)
                        } />
                    </form>
                    </div>
                    <div className={anchoVentana>=750?"col-8":"col-12"}>
                        <div className="jumbotron">
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/1.png"
                                alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/2.png"
                                alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/3.png"
                                alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </div>
)}