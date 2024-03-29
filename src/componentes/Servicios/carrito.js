import axios from "axios"

const URL_API_CARRITO = process.env.NODE_ENV === 'production'
                                    ? '/api/carrito/'
                                    : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/carrito/`



export async function enviarCarrito(pedido) {
    try {
        const { data:carritoGuardado } = await axios.post(URL_API_CARRITO, pedido)
        return carritoGuardado
    }
    catch(error) {
        console.error('ERROR POST AXIOS:', error.message)
        return {}
    }
}

export async function getPreference(carrito) {

    const prefItems = { 
        body: {
            items: carrito.map(p => ({
                id: p._id,
                title: p.nombre,
                description: p.detalles,
                quantity: parseInt(p.cantidad),
                unit_price: Number(p.precio)
            })),
            back_urls: {
                "success": window.location.origin + window.location.pathname,
                "failure": window.location.origin + window.location.pathname,
                "pending": window.location.origin + window.location.pathname
            },
            auto_return: "approved"            
        }
    }

    return axios.post(URL_API_CARRITO + 'mp/create_preference', prefItems)
}
