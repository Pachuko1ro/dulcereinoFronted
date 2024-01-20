import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers";

export const store = configureStore({
    reducer: loginReducer,          // reducer
    preloadedState: {       // state
        login: false,
        usuarioLogueado: { usuario: '', admin: false }
    },
    devTools: true          // devtools (redux devTools)
})