import {useState} from 'react'
//icons
import { RiArrowRightSLine } from 'react-icons/ri'

export const Dropdown = ({navItem,generateNavigation}) => {
    const [showSubMenu,setShowSubMenu] = useState(false);
    return (
        <li >
            <button 
                to={navItem.url}  
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 text-secondary-50 transition-colors"
                onClick={()=>{setShowSubMenu(!showSubMenu)}}
            >
                <span className="flex flex-items-center gap-4">
                    {/* <RiEarthLine  className="text-primary mt-1" /> */}
                    {navItem.icon}
                    {navItem.title}
                </span>
                <RiArrowRightSLine className={`mt-1  transition-all ${showSubMenu && "rotate-90"}`}/>
            </button>
            <ul className={`my-2 py-2 px-4 transition-all duration-500 ${!showSubMenu && "hidden"}`}>
                {generateNavigation(navItem.children)} 
            </ul>
      </li>
  )
}
