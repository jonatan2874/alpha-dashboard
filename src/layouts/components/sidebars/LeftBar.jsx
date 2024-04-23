import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import  SubMenu from './SubMenu'; 
import items from "../../navigation.json";
//load icons
const iconsri = await import('react-icons/ri');
const iconshi = await import('react-icons/hi');
const iconshi2 = await import('react-icons/hi2');
// join icons in a only const
const icons = { ...iconsri, ...iconshi, ...iconshi2 };

const LeftBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div
                className={`xl:h-[100uv] overflow-y-scroll fixed xl:static  w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 transition-all ${showMenu ? "left-0" : "-left-full "}`}
            >
                <div>
                    <div className='flex items-center justify-center relative ' >
                        <h1 className={`text-center text-2xl font-bold  text-primary`}>
                            Admin <span className="text-4xl">.</span>
                        </h1>
                        <div
                            className='xl:hidden cursor-pointer absolute right-0 text-secondary-50'
                            onClick={() => { setShowMenu(!showMenu) }}
                        >
                            <HiOutlineX />
                        </div>
                    </div>
                    <ul>
                        {items.map(item => {
                            // console.log(item)
                            return (
                                <SubMenu key={item.id} item={item} icons={icons} setShowMenu={setShowMenu}/>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <button
                className="xl:hidden fixed top-4 left-4 text-secondary-50 p-3 rounded-full "
                onClick={() => { setShowMenu(!showMenu) }}
            >
                <HiOutlineMenu />
            </button>
            {/* outer div for close menu */}
            <div
                className={`xl:hidden bg-secondary-100 h-full fixed w-[20%] md:w-[60%] lg:w-[70%] opacity-50  z-50 transition-all ${showMenu ? "left-[80%] md:left-[40%] lg:left-[30%]" : "-left-full "}`}
                onClick={() => { setShowMenu(!showMenu) }}
            >
            </div>
        </>
    )
}

export default LeftBar;
