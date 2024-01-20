import { LOGIN, USUARIOLOGUEADO } from "./types"

export const accionLogin = estado => {
    console.warn('ACTION -> accionLogin', estado)

    return {
        type: LOGIN,
        estado
    }
}

export const accionUsuarioLogueado = (usuario,admin) => {
    console.warn('ACTION -> accionUsuarioLogueado', usuario, admin)

    return {
        type: USUARIOLOGUEADO,
        usuario,
        admin
    }
}