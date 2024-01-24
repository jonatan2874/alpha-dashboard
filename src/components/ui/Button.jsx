import { Button } from '@mui/material';

export const TwButton = ({ color, loading = false, ...props }) => {

    const currentColor = color === "success"
        ? "bg-green-600 hover:bg-green-700"
        : color === "error"
            ? "bg-red-600 hover:bg-red-700"
            : color === "info"
                ? "bg-blue-600 hover:bg-blue-700"
                : color === "warning"
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-primary hover:opacity-80 hover:bg-primary"

    return (
        <Button
            {...props}
            disabled={loading}
            className={`${currentColor} text-white transition-colors`}
        >
            {
                loading ?
                    <div className='flex items-center gap-2 text-secondary-50'>
                        <svg className='animate-spin' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M2.501 8a5.5 5.5 0 1 1 5.5 5.5A.75.75 0 0 0 8 15a7 7 0 1 0-7-7a.75.75 0 0 0 1.501 0Z" /></svg>
                        Cargando
                    </div>
                    :
                    props.children
            }
        </Button>
    )
}
