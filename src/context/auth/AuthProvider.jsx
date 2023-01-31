import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer";

import { types } from "./types/types";

const initialState = {
    logged: false
}

const AuthProvider = ({ children }) => {

    const [state,dispatch] = useReducer( authReducer, initialState );

    const login = (name = '') =>{
        const action = {
            type : types.login,
            payload : {
                id : 1,
                name : "usuario"
            }
        }
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{state,login}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider