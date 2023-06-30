import { types } from "./types/types";

export const authReducer = (state, action) =>{
    switch (action.type) {
        case types.login:
            return {
                ...state,
                is_auth : true,
                user: action.payload,                
            };            
        
        case types.logout:
            return {
                is_auth : false
            }; 
            
        case types.theme:
            return {
                ...state,
                theme : (state.theme !=='dark')? 'dark' : 'light'
            }; 

        default:
            return state;
    }
}