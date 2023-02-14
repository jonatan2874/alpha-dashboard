import {useState} from 'react'
import { Link } from 'react-router-dom'

//load icons
const iconsri = await import('react-icons/ri');
const iconshi = await import('react-icons/hi');
// join icons in a only const
const icons = {...iconsri,...iconshi};

const subMenus = ({link}) =>{

  if (!link || !link.type) {
    return null;
  }
  switch (link.type) {
    case "group":
      return group(link);
    case "collapse" :
      return collapse(link);
    default:
      return item(link);
  }
}

const group = item =>{
  return (
    <div key={item.id}>
      <li key={item.id} className='mt-8' >
        <div className='flex flex-col text-sm  py-2 px-4'>
            <span className='text-lg text-primary'>{item.title}</span>
            <span className='text-xs text-gray-500'>{item.subtitle}</span>
        </div>
      </li>
      {item.children && item.children.map(subitem=>subMenus({link:subitem}))}
    </div>
  )
}
const collapse = item =>{
  const [showSubMenu,setShowSubMenu] = useState(false);
    return (
        <li key={item.id} >
            <button 
                to={item.url}  
                className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 text-secondary-50 transition-colors"
                onClick={()=>{setShowSubMenu(!showSubMenu)}}
            >
                <span className="flex items-center gap-4">
                    {icons[item.icon] && icons[item.icon]()}  
                    {item.title}
                </span>
                {icons['RiArrowRightSLine']()}                
            </button>
            <ul className={`my-2 py-2 px-4 transition-all duration-500 ${!showSubMenu && "hidden"}`}>
                {item.children && item.children.map( sublink => (
                    subMenus({link:sublink})
                  ))}
            </ul>
      </li>
  )
}
const item = item =>{
  return (
    <li key={item.id} >
        <Link 
          to={item.url} 
          className="flex items-center gap-4 py-2 px-4 rounded-lg text-secondary-50 hover:bg-secondary-900 transition-colors"
        >
          {icons[item.icon] && icons[item.icon]()}  
          {item.title}
        </Link>
    </li>
  )
}

export {subMenus}

