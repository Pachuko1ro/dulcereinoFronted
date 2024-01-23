import { LOGIN, USUARIOLOGUEADO } from "./types"

export const accionLogin = estado => {

    return {
        type: LOGIN,
        estado
    }
}

export const accionUsuarioLogueado = (usuario,admin) => {

    return {
        type: USUARIOLOGUEADO,
        usuario,
        admin
    }
}