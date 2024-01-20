import axios from "axios"

//console.log('process.env.NODE_ENV:', process.env.NODE_ENV)
//console.log('process.env.REACT_APP_PORT_SRV_DEV:', process.env.REACT_APP_PORT_SRV_DEV)

const URL_API_CONTACTOS = process.env.NODE_ENV === 'production'
                                    ? '/api/contactos/'
                                    : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/contactos/`


export async function obtenerContactos() {
    try {
        const { data:contactosLeidos } = await axios.get(URL_API_CONTACTOS)
        
        return contactosLeidos
    }
    catch(error) {
        console.error('ERROR GET AXIOS:', error.message)
        return []
    }
}

export async function guardarContacto(contacto) {
    try {
        const { data:contactoGuardado } = await axios.post(URL_API_CONTACTOS, contacto)
        return contactoGuardado
    }
    catch(error) {
        console.error('ERROR POST AXIOS:', error.message)
        return {}
    }
}

