import AuthProvider from "./auth/AuthProvider";
import AppProvider from "./app/AppProvider";

export const MainContext = ({children}) =>{
    return(
        <AuthProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </AuthProvider>
    )
}

export default MainContext
