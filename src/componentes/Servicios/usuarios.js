import axios from "axios"

const URL_API_USUARIOS = process.env.NODE_ENV === 'production'
                                    ? '/api/usuarios/'
                                    : `http://localhost:${process.env.REACT_APP_PORT_SRV_DEV}/api/usuarios/`



export async function loginUsuario(credenciales) {
    try {
        const { data:usuarioLogueado } = await axios.post(URL_API_USUARIOS+'login', credenciales)
        return usuarioLogueado
    }
    catch(error) {
        console.error('ERROR LOGIN AXIOS:', error.message)
        return {}
    }
}

export async function registerUsuario(credenciales) {
    try {
        const { data:usuarioRegistrado } = await axios.post(URL_API_USUARIOS+'register', credenciales)
        return usuarioRegistrado
    }
    catch(error) {
        console.error('ERROR REGISTER AXIOS:', error.message)
        return {}
    }
}

export async function validarTokenUsuario(token) {
    try {
        const { data:rta } = await axios.post(URL_API_USUARIOS+'token', { token })
        return rta
    }
    catch(error) {
        console.error('ERROR VALIDARTOKEN AXIOS:', error.message)
        return {}
    }
}
