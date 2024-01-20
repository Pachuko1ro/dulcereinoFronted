import { useEffect, useState } from 'react'

import './Index.css'

import { Tabla } from './Tabla'
import { useLocalStorage } from '../Hooks/useLocalStore'
import { enviarCarrito, getPreference } from '../Servicios/carrito'

import './pago.js'
import { Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router'


export function Index(props) {
    //const { titulo: enunciado } = props             // destructuring Object con alias

    const [carrito, setCarrito] = useLocalStorage('carrito', [])
    const [ compraStatus, setCompraStatus ] = useState({payment_id: 'null', status: 'null', merchant_order_id: 'null'})

    const navigate = useNavigate()

    useEffect(() => {
        console.log('Componente Index Carrito (montado)')

        return () => {
            console.log('Componente Index Carrito (desmontado)')
        }
    }, [])

    
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

    async function pedir(compra) {
        console.log('pedir')

        const carritoEnviado = await enviarCarrito({compra: compra, pedido: carrito})
        console.log(carritoEnviado)
        setCarrito([])
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
            borderRadius: '8px',
        }        
    }

    //https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/checkout-customization/user-interface/auxiliary-callbacks#editor_2
    const onReady = async () => {
        console.log('onReady')

        const queryParameters = new URLSearchParams(window.location.search)
        //console.log(queryParameters)
        const compraParam = {}
        compraParam.payment_id = queryParameters.get('payment_id') || 'null'
        compraParam.status = queryParameters.get('status') || 'null'
        compraParam.merchant_order_id = queryParameters.get('merchant_order_id') || 'null'
        console.log(compraParam)

        if(compraParam.payment_id !== 'null' && compraParam.status !== 'null' && compraParam.merchant_order_id !== 'null') {
            if(compraParam.status !== compraStatus.status) {
                setCompraStatus(compraParam)

                if(compraParam.status === 'approved') {
                    await pedir(compraParam)
                    setTimeout(() => {
                        //window.location.href = '/'
                        navigate('/inicio')
                    },10000)
                }
            }
        }
    }

    const onError = () => {
        console.log('onError')
    }

    const onSubmit = () => {
        console.log('onSubmit')

        return new Promise((resolve, reject) => {
            getPreference(carrito)
                .then(({data:response}) => {
                    console.log(response)
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
                                    <li><h4>payment_id: {compraStatus.payment_id}</h4></li>
                                    <li><h4>status: {compraStatus.status}</h4></li>
                                    <li><h4>merchant_order_id: {compraStatus.merchant_order_id}</h4></li>
                                </ul>
                            </div>
                    }
                    <br />
                    {carrito.length === 0 && 
                        <div className="jumbotron">
                            <div className="row">
                               
                                <div className="col-8">
                                    <h1 className="display-4">¡El carrito está vacio!</h1>
                                    <p className="lead">No hay problema. Estas a tiempo para seguir comprando.</p>
                                    <p className="lead">No te pierdas las ofertas más extremas del día!!!</p>
                                    <hr className="my-4"></hr>
                                    <p>Es simple, presioná el botón de abajo y podrás elegir lo que vos quieras.</p>
                                    <a className="btn btn-primary btn-lg" href="./inicio" role="button">Volver a los productos</a>
                                </div>
                                <div className="col-4">
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

                            <div id="wallet_container">
                                <Wallet 
                                    customization={customization}
                                    onReady={onReady}
                                    onError={onError}
                                    onSubmit={onSubmit}
                                />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
