import { useEffect, useState } from 'react'

import './Index.css'

import { Tabla } from './Tabla'
import { useLocalStorage } from '../Hooks/useLocalStore'
import { enviarCarrito, getPreference } from '../Servicios/carrito'

import './pago.js'
import { Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { clearToken, getToken } from '../Servicios/token.js'
import { validarTokenUsuario } from '../Servicios/usuarios.js'
import { accionLogin, accionUsuarioLogueado } from '../../state/actions.js'


export function Index(props) {

    const [comprar, setComprar] = useState(false)
    const [carrito, setCarrito] = useLocalStorage('carrito', [])
    const [ compraStatus, setCompraStatus ] = useState({payment_id: 'null', status: 'null', merchant_order_id: 'null'})

    const navigate = useNavigate()
    const irAInicio = () => {
        navigate('/inicio')
      }
    const dispatch = useDispatch()
    const[ ,SetNav] = useLocalStorage('navigator', '/')
 


    useEffect(() => {

        async function validar() {
            const token = getToken()
            const rta = await validarTokenUsuario(token)

            if (rta.error) {
                dispatch(accionLogin(false))
                dispatch(accionUsuarioLogueado('', false))
                clearToken()
                navigate('/')
            }
            else {
                SetNav('/carrito')                
            }
        }
        validar()
    }, [dispatch, navigate, SetNav])


    useEffect(() => {
        return () => {
            window.walletBrickController?.unmount()
        }
    }, [])

    useEffect(() => {
        if(!comprar) {
            window.walletBrickController?.unmount()
        }
    }, [comprar])

    useEffect(() => {
        async function pedir(compra) {
            const carritoEnviado = await enviarCarrito({compra: compra, pedido: carrito})
            console.log(carritoEnviado)
            setCarrito([])
        }
    
        const miOnReady = async () => {
            const queryParameters = new URLSearchParams(window.location.search)
            const compraParam = {}
            compraParam.payment_id = queryParameters.get('payment_id') || 'null'
            compraParam.status = queryParameters.get('status') || 'null'
            compraParam.merchant_order_id = queryParameters.get('merchant_order_id') || 'null'
    
            if(compraParam.payment_id !== 'null' && compraParam.status !== 'null' && compraParam.merchant_order_id !== 'null') {
                if(compraParam.status !== compraStatus.status) {
                    setCompraStatus(compraParam)
    
                    if(compraParam.status === 'approved') {
                        await pedir(compraParam)
                        setTimeout(() => {
                            navigate('/inicio')
                        },10000)
                    }
                }
            }
        }
    
        miOnReady()
    }, [compraStatus, navigate, carrito, setCarrito])

    
    function borrarAll() {
        setCarrito([])
    }

    function borrarID(id) {
        const carritoClon = [...carrito]
        const index = carritoClon.findIndex(p => p.id === id)
        carritoClon.splice(index,1)
        setCarrito(carritoClon)
    }
    
    function incrementarCantID(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)
        if(producto.cantidad < producto.stock) {
            producto.cantidad++
            setCarrito(carritoClon)
        }
    }
    
    function decrementarCantID(id) {
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id === id)
        if(producto.cantidad > 1) {
            producto.cantidad--
            setCarrito(carritoClon)
        }
    }


    const customization = {
        //https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/checkout-customization/user-interface/change-button-texts
        texts: {
            action: 'pay',
            valueProp: 'security_safety'
        },
        //https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/checkout-customization/user-interface/change-button-appearance
        visual: {
            buttonBackground: 'default',
            borderRadius: '6px',
        }        
    }

    //https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/checkout-customization/user-interface/auxiliary-callbacks#editor_2
    const onReady = async () => {
    }

    const onError = () => {
    }

    const onSubmit = () => {

        return new Promise((resolve, reject) => {
            getPreference(carrito)
                .then(({data:response}) => {
                    resolve(response.preferenceId)
                })                
                .catch(error => {
                    reject(error)
                })
        })
    }
    return (
        <div className="Carrito">
            <div className="jumbotron">

                <div className="carrito">
                    <h1>Carrito de compras{carrito.length > 0 && <button className="btn btn-danger ml-4" onClick={borrarAll}>Borrar Carrito</button>}</h1>
                    <hr />
                    {
                        compraStatus.status !== 'null' &&
                            <div className={`alert alert-${compraStatus.status === 'approved'? 'success':'danger'} w-50 m-auto`}>
                                <h2>Estado de compra</h2>
                                <hr />
                                <ul>
                                    <li><h4>Número pago: {compraStatus.payment_id}</h4></li>
                                    <li><h4>Estado: {compraStatus.status}</h4></li>
                                    <li><h4>Número de orden: {compraStatus.merchant_order_id}</h4></li>
                                </ul>
                            </div>
                    }
                    <br />
                    {carrito.length === 0 && 
                        <div className="jumbotron">
                            <div className="row">
                               
                                <div className="col-6">
                                    <h2 className="display-4">¡El carrito está vacio!</h2>
                                    <p className="lead">No hay problema. Estas a tiempo para seguir comprando.</p>
                                    <p className="lead">No te pierdas las ofertas más extremas del día!!!</p>
                                    <hr className="my-4"></hr>
                                    <p>Es simple, presioná el botón de abajo y podrás elegir lo que vos quieras.</p>
                                    <button className="btn btn-primary btn-lg" onClick={irAInicio}>Volver a los productos</button>
                                </div>
                               <div className="col-6">
                                    <img className="img-fluid" id='cartvacio' src="https://pachuko.000webhostapp.com/img/carritoVacio.png" alt="carrito"/>
                                </div>
                                
                        </div>
                      </div>
                    }    
                    {carrito.length > 0 &&
                        <>
                            <Tabla 
                                carrito={carrito} 
                                borrarID={borrarID}
                                incrementarCantID={incrementarCantID}
                                decrementarCantID={decrementarCantID}
                            />
                            <div className="text-center my-3">
                                <button className={`btn btn-${comprar?'warning':'success'}`} onClick={()=> setComprar(!comprar)}>
                                    { comprar? 'Cancelar pago':<b>Pagar</b> }
                                </button>
                            </div>

                            {comprar &&

                                    <div id="wallet_container">
                                    <Wallet 
                                    customization={customization}
                                    onReady={onReady}
                                    onError={onError}
                                    onSubmit={onSubmit}
                                    />
                                    </div>
                               
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
