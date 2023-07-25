import { useReducer } from "react"

import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

import { types } from "./types/types";

const init = ()=>{
    return {
        right_bar : {
            content : "holo init",
            show : false
        }
    }
}

const AppProvider = ({ children }) => {

    const [state,dispatch] = useReducer( appReducer, {}, init );
    // console.log(right_bar)
    // right methods
    const right_bar_methods = {}

    right_bar_methods.change_content = (content) =>{

        const action = {
            type : types.right_bar.change,
            payload : {
                content
            }
        }

        dispatch(action);

    }

    right_bar_methods.show = ()=> {
        const action = {
            type : types.right_bar.show,
            payload : {
                show : !state.right_bar.show
            }
        }

        dispatch(action);
    }

    return (
        <AppContext.Provider value={{
                //state
                ...state,

                //methods
                right_bar_methods
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider