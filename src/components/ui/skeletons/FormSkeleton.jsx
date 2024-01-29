import { Skeleton } from "@mui/material"


const FormSkeleton = () => {
    return (
        <div className="w-full">
            <Skeleton className="flex-1" animation="wave" height={80} />
            <Skeleton className="flex-1" animation="wave" height={80} />
            <Skeleton className="flex-1" animation="wave" height={80} />
            <Skeleton className="flex-1" animation="wave" height={80} />
            <Skeleton className="flex-1" animation="wave" height={80} width={100} />
        </div>
    )
}

export default FormSkeleton