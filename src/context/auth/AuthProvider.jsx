import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer";

import { types } from "./types/types";

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return {
        is_auth: !!user,
        user,
        theme: 'dark'
    }
}

const AuthProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = '') => {
        const user = {
            id: 1,
            name: name,
            role: "admin",
            permissions: [
                "documentation",
                "documentation/buttons",
                "/tickets",
                "/dashboards/analytics",
                "/dashboards/finance",
                "documentation/crud",
                "documentation/alerts",
                "documentation/crud-demo",
                "documentation/form-demo",
                "documentation/right-bar",
                "documentation/crudv2",
            ]
        }

        const action = {
            type: types.login,
            payload: {
                user,
                theme: 'dark'
            }
        }

        localStorage.setItem('user', JSON.stringify(user))

        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = {
            type: types.logout,
        };
        dispatch(action);

    }

    const changeTheme = () => {
        const action = {
            type: types.theme,
            payload: {
                ...state
            }
        }
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            //state
            ...state,

            //methods
            login,
            logout,
            changeTheme
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider