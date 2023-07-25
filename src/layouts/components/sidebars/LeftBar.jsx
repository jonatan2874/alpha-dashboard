import React, {useState} from 'react'
//icons
import { 
        HiOutlineMenu
     } from 'react-icons/hi'

//submenus an navigation
import { subMenus } from './Navigation';
import links from "../../navigation.json";


const LeftBar = () => {
    const [showMenu,setShowMenu] = useState(false);
  return (
    <>
        <div 
            className={`xl:h-[100uv] overflow-y-scroll fixed xl:static  w-[80%] md:w-[40%] lg:w-[30%] xl:w-auto h-full top-0 bg-secondary-100 p-4 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full " } transition-all`}
        >
            <div>
                <div className='flex items-center justify-center relative ' >
                    <h1 className={`text-center text-2xl font-bold  text-primary`}>
                        Admin <span className="text-4xl">.</span>
                    </h1>
                    <HiOutlineMenu 
                        className='xl:hidden cursor-pointer absolute right-0 text-secondary-50' 
                        onClick={()=>{setShowMenu(!showMenu)}}
                    />
                </div>
                <ul>
                {links.map( link => (
                    subMenus({link})
                  ))}
                </ul>
            </div>
        </div>
        <button 
            className="xl:hidden fixed top-4 left-4 text-secondary-50 p-3 rounded-full "
            onClick={()=>{setShowMenu(!showMenu)}}
        >   {showMenu ? <HiOutlineMenu  /> : <HiOutlineMenu  />}
            
        </button>
    </>
  )
}

export default LeftBar