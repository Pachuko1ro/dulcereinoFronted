import { useDispatch } from "react-redux"
import { accionLogin, accionUsuarioLogueado } from "../state/actions"
import { clearToken, getToken } from "./Servicios/token"
import { validarTokenUsuario } from "./Servicios/usuarios"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useLocalStorage } from "./Hooks/useLocalStore"

export const RutaNoValida = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[nav,SetNav] = useLocalStorage('navigator', '/')

    useEffect(() => {

        async function validar() {
            const token = getToken()

            const rta = await validarTokenUsuario(token)

            if (rta.error) {
                dispatch(accionLogin(false))
                dispatch(accionUsuarioLogueado('', false))
                clearToken()
                SetNav('/')
                navigate('/')
            }
            else {
                navigate((nav || '/') + window.location.search)
            }
        }
        validar()
    }, [dispatch, navigate, SetNav, nav])

    return <></>
}