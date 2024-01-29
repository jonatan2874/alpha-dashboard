const SelectSkeleton = () => (
    <div className='w-full h-[50px] rounded bg-neutral-300 animate-pulse flex gap-5 items-center pl-5 pr-3'>
        <div className='w-full h-[10px] rounded-full bg-neutral-400'></div>
        <div className='w-3 h-2 rounded-lg bg-neutral-400'></div>
    </div>
);

export default SelectSkeleton;