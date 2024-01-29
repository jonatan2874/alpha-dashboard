
const ItemsSkeleton = () => {

    return (
        <>
            {
                [1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="w-[300px] h-[130px] rounded bg-neutral-200 animate-pulse flex">
                        <div className="bg-neutral-300 w-[130px] h-full rounded"></div>
                        <div className="w-[170px] rounded px-5 py-4 flex flex-col justify-between">
                            <div>
                                <div className="w-full bg-neutral-300 h-[20px] rounded-full"></div>
                                <div className="w-[50px] bg-neutral-300 h-[10px] rounded-full mt-2"></div>
                            </div>
                            <div className="flex gap-5 justify-end">
                                <div className="w-[40px] h-[40px] bg-neutral-300 rounded-lg"></div>
                                <div className="w-[40px] h-[40px] bg-neutral-300 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default ItemsSkeleton