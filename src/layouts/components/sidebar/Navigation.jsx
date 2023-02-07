import { Link } from 'react-router-dom'
import { Dropdown } from './Dropdown';

 const generateNavigation = ( navigationConfig,Navigation = []) => {
 
    for (let i = 0; i < navigationConfig.length; i += 1) {
      const navItem = navigationConfig[i];

      if (navItem.type === 'item') {
        Navigation.push(
                        <li key={navItem.id} >
                            <Link 
                              to={navItem.url} 
                              className="flex items-center gap-4 py-2 px-4 rounded-lg text-secondary-50 hover:bg-secondary-900 transition-colors"
                            >
                              {navItem.icon}
                              {navItem.title}
                            </Link>
                        </li>
                    )
        // Navigation.push({
        //   id: navItem.id,
        //   title: navItem.title,
        //   type: navItem.type,
        //   icon: navItem.icon || false,
        //   url: navItem.url,
        //   auth: navItem.auth || null,
        // });
      }

      if (navItem.type === 'collapse') {
        Navigation.push(
          <Dropdown 
            navItem={navItem} 
            generateNavigation={generateNavigation} 
            key={navItem.id} 
          />
          
        )
      }

      if (navItem.type === 'group') {
        Navigation.push(
          <li key={navItem.id} className='mt-8' >
            <div className='flex flex-col text-sm  py-2 px-4'>
                <span className='text-lg text-primary'>{navItem.title}</span>
                <span className='text-xs text-gray-500'>{navItem.subtitle}</span>
            </div>
          </li>
      )

        if (navItem.children) {
          generateNavigation(navItem.children, Navigation);
        }
      }
    }
    return Navigation;
}


export {generateNavigation}

