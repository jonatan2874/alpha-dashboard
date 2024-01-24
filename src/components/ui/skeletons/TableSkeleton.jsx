import { Skeleton } from "@mui/material"


const TableSkeleton = () => {
    return (
        <div className="w-full min-w-[350px]">
            <Skeleton animation="wave" height={80} />
            <div className="flex w-full gap-2">
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
            </div>
            <div className="flex w-full gap-2">
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
            </div>
            <div className="flex w-full gap-2">
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
            </div>
            <div className="flex w-full gap-2">
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
                <Skeleton className="flex-1" animation="wave" height={50} />
            </div>
        </div>
    )
}

export default TableSkeleton