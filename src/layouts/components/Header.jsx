import React,{useContext} from 'react'

//icons
import { 
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
  RiThumbUpLine,
  RiChat3Line,

} from 'react-icons/ri'
import { HiSun,HiOutlineMoon } from "react-icons/hi";

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';

const Header = () => {
  const {user,logout,theme,changeTheme} = useContext(AuthContext)

  const onLogout = ()=>{
    logout();
  }

  const onChangeTheme = ()=>{
    changeTheme();
  }

  return (
    <header 
        className='h-[7vh] w-full border-b border-secondary-100 p-8 flex items-center justify-end'
    >
        <nav className='flex items-center gap-x-2'>
        <button onClick={onChangeTheme} className="hover:bg-secondary-100 text-secondary-50 p-2 rounded-lg">
          {theme=="dark"?  <HiSun className='text-2xl' /> : <HiOutlineMoon className='text-2xl' /> }
          
        </button>

          <Menu 
            menuClassName="bg-secondary-100 p-4"
            transition
            arrow
            arrowClassName="bg-secondary-100 "
            align="center"
            menuButton={
              <MenuButton
                className="relative hover:bg-secondary-100 p-2 rounded-lg text-secondary-50 transition-colors">
                  <RiNotification3Line/>
                  <span className="absolute -top-0.5 -right-0 bg-primary box-content py-0.5 px-1.5 text-secondary-50 rounded-full text-[8px] font-bold">2</span>
              </MenuButton> 
            }
          >
            <h1 className='text-gray-300 text-center font-medium'>Notificaciones (2)</h1>
            <hr className='my-4 border-gray-500'/>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link to="/" className='text-gray-300 flex items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg flex-1'>
              <img 
                  src="https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg" 
                  className='w-8 h-8 object-cover rounded-full'
                />
              <div className='text-sm flex flex-col'>
                  <div className='flex items-center justify-between gap-4'>
                    <span >jonatan herran </span>                    
                    <span >21/01/2023</span>
                  </div>
                  <p className='text-gray-500 text-xs'>Reunion desarrollo, propuest...</p>
              </div>
              </Link>
            </MenuItem>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link to="/" className='text-gray-300 flex items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg flex-1'>
              <RiThumbUpLine className='p-2 bg-blue-100 rounded-full text-blue-700 box-content'/>
              <div className='text-sm flex flex-col'>
                  <div className='flex items-center justify-between gap-4'>
                    <span >Nuevo like</span>                    
                    <span >21/01/2023</span>
                  </div>
                  <p className='text-gray-500 text-xs'>han reaccionado a la publica...</p>
              </div>
              </Link>
            </MenuItem>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link to="/" className='text-gray-300 flex items-center gap-4 py-2 px-4 hover:bg-secondary-900 transition-colors rounded-lg flex-1'>
              <RiChat3Line className='p-2 bg-yellow-100 rounded-full text-yellow-700 box-content'/>
              <div className='text-sm flex flex-col'>
                  <div className='flex items-center justify-between gap-4'>
                    <span >Nuevo comentario</span>                    
                    <span >21/01/2023</span>
                  </div>
                  <p className='text-gray-500 text-xs'>han comentado a la publica...</p>
              </div>
              </Link>
            </MenuItem>
            <hr className='my-4 border-gray-500'/>
            <MenuItem className="p-0 hover:bg-transparent flex justify-center items-center ">
              <Link to="/" className='text-gray-400 text-sm cursor-pointer hover:text-white transition-colors'>
                  Todas las notificaciones
              </Link>
            </MenuItem>

          </Menu>
          
          <Menu 
            menuClassName="bg-secondary-100 p-4"
            menuButton={
                        <MenuButton
                          className="flex items-center gap-x-2 hover:bg-secondary-100 py-2 px-4 text-secondary-50 rounded-lg transition-colors">

                            <img 
                              src="https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg" 
                              className='w-6 h-6 object-cover rounded-full'
                            />
                            <span>{user?.name}</span>
                            <RiArrowDownSLine/>
                        </MenuButton> 
                      } 
            transition
            arrow
            arrowClassName="bg-secondary-100 "
            direction="top"
            align="end"
          >

            <MenuItem className="p-0 hover:bg-transparent">
              <Link 
                to="/profile" 
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-3 px-6 flex-1"
              >
                <img 
                  src="https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg" 
                  className='w-8 h-8 object-cover rounded-full'
                />
                <div className='flex flex-col text-sm'>
                  <span className='text-sm'>{user?.name}</span>
                  <span className='text-xs text-gray-500'>herran1212@hotmail.com</span>
                </div>
              </Link>
            </MenuItem>
            <hr className='my-4 border-gray-500'/>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link 
                to="/configuration" 
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-3 px-6 flex-1"
              >
                <RiSettings3Line />
                <span>Configuracion</span>
              </Link>
            </MenuItem>
            <MenuItem className="p-0 hover:bg-transparent">
              <Link 
                to="/login" 
                className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-3 px-6 flex-1"
                onClick={onLogout}
              >
                <RiLogoutCircleRLine />
                <span>Cerrar Sesion</span>
              </Link>
            </MenuItem>
          </Menu>
        </nav>
    </header>
  )
}

export default Header