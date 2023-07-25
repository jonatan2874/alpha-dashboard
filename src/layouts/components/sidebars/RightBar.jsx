import React, {useState} from 'react'
//icons
import { 
        HiOutlineMenu
     } from 'react-icons/hi'

//submenus an navigation
import { subMenus } from './Navigation';
import links from "../../navigation.json";


const RightBar = (children) => {
    const [showMenu,setShowMenu] = useState(true);
  return (
    <>
        <div 
            className={`absolute top-0 right-0 h-full bg-gray-500 w-1/4 ${showMenu ? "right-0" : "-left-full " } transition-all`}
        >
            <>
            holiiiii
               
            </>
        </div>
        <button 
            className="xl:hidden fixed top-4 left-4 text-secondary-50 p-3 rounded-full "
            onClick={()=>{setShowMenu(!showMenu)}}
        >   {showMenu ? <HiOutlineMenu  /> : <HiOutlineMenu  />}
            
        </button>
    </>
  )
}

export default RightBar