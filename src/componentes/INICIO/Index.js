import { useEffect, useState } from 'react'

import './Index.css'

import { obtenerProductos } from '../Servicios/productos'
import { Card } from './Card'
import { useLocalStorage } from '../Hooks/useLocalStore'

export function Index(props) {
    
    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useLocalStorage('carrito', [])

    useEffect(() => {
        console.log('Componente Index Inicio (montado)')

        async function pedir() {
            const productos = await obtenerProductos()
            //console.log(productos)
            setProductos(productos)
        }
        pedir()

        return () => {
            console.log('Componente Index Inicio (desmontado)')
        }
    }, [])


    function agregarCarritoID(id) {
        console.log('agregarCarritoID', id)

        const producto = productos.find(p => p.id === id)
        console.log(producto)

        const carritoClon = [...carrito]

        let pC = carritoClon.find(prodC => prodC.id === producto.id)
        if(!pC) {
            producto.cantidad = 1
            carritoClon.push(producto)
        }
        else {
            pC.cantidad++
        }
        setCarrito(carritoClon)
    }
    
    return (
        <div className="Inicio">
            <div className="jumbotron">
                <h2>Listado de productos</h2>
                <hr />
                <div className="inicio">
                    <div className="section-cards">
                        <div className="section-cards-header">
                            
                        </div>

                        <div className="cards-container">
                            { productos.map( (producto, index) => 
                                    <Card 
                                        cantProducto={producto.cantidad}
                                        key={index} 
                                        producto={producto} 
                                        agregarCarritoID={agregarCarritoID}
                                    />
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}