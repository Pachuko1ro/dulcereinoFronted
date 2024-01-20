import { LOGIN, USUARIOLOGUEADO } from "./types"

export const loginReducer = (state, action) => {
    console.warn('REDUCER -> loginReducer', state, action)

    switch(action.type) {
        case LOGIN:
            return { ...state, login: action.estado }
            
        case USUARIOLOGUEADO:
            return { ...state, usuarioLogueado: { usuario: action.usuario, admin: action.admin } }
            
        default:
            return state
    }
}