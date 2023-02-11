import { Button } from '@mui/material'

export const TwButton = (props) => {
    return (
         <Button 
            {...props} 
            className='bg-primary hover:opacity-80 hover:bg-primary transition-colors text-secondary-900'
        >
        </Button>
    )
}
