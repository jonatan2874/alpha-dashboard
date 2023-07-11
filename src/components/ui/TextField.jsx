import {TextField} from '@mui/material';

export const TwTextField = (props)=>{
    return (
        <TextField 
           {...props} 
           className=' hover:opacity-80 hover:bg-primary transition-colors text-secondary-900'
       >
       </TextField>
   )
}