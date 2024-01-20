import { useState } from 'react'
import './Login.css'

import * as servicio from './Servicios/usuarios'
import { accionLogin, accionUsuarioLogueado } from '../state/actions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { clearToken, setToken } from './Servicios/token'
import { Carousel } from 'react-bootstrap'

export function Login() {

    const [ credenciales, setCredenciales ] = useState({ usuario: '', password: '', admin: false })
    const [ modoRegister, setModoRegister ] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit = async e => {
        e.preventDefault()

        //console.log('onSubmit', credenciales)

        // Modo login
        if(!modoRegister) {
            const rta = await servicio.loginUsuario(credenciales)
            //console.log(rta)

            const { status, usuario, admin, token } = rta
            console.log(status, usuario, admin, token)

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
                    <div className="col-4">
                    <h2>{modoRegister? 'Register':'Login'}</h2>
                    <hr />
                    <form className='w-75' onSubmit={onSubmit}>
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

                        <input type="submit" className={`btn btn-${modoRegister? 'danger':'success'} m-2`} value={modoRegister? 'Register':'Login'} />
                        <input type="button" className="btn btn-warning m-2" value={modoRegister? 'Ir a Login':'Ir a Register'} onClick={
                            () => setModoRegister(!modoRegister)
                        } />
                    </form>
                    </div>
                    <div className="col-8">
                        <div className="jumbotron">
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/1.png"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                              
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/2.png"
                                alt="Second slide"
                                />
                                <Carousel.Caption>
                                
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="https://pachuko.000webhostapp.com/img/3.png"
                                alt="Third slide"
                                />
                                <Carousel.Caption>
                               
                                </Carousel.Caption>
                            </Carousel.Item>
                            </Carousel>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}