import React, { useState } from 'react';

const Collapse = ({ item, icons, children }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  
  return (
    <li key={item.id} >
      <button
        to={item.url}
        className="w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 text-secondary-50 transition-colors"
        onClick={() => { setShowSubMenu(!showSubMenu) }}
      >
        <span className="flex items-center gap-4">
          {icons[item.icon] && icons[item.icon]()}
          {item.title}
        </span>
        {icons['RiArrowRightSLine']()}
      </button>
      <ul className={`my-2 py-2 px-4 transition-all duration-500 ${!showSubMenu && "hidden"}`}>
        {children}
      </ul>
    </li>
  )
}

export default Collapse;
