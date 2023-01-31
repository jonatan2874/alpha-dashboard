import React,{useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
//icons
import {
          RiMailLine, 
          RiLockLine, 
          RiEyeLine,
          RiEyeOffLine
        } from "react-icons/ri"

const Login = () => {

  const { login } = useContext(AuthContext);
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onLogin = ()=>{
    login('jonatan');
    navigate('/',{
      replace : true
    }

    );  
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-xl" >
        <h1 className="text-3xl text-center font-bold tracking-[5px] text-white mb-8 w-auto lg:w-[450px]">Iniciar Sesión</h1>
        <form className="mb-8">
          <button className="flex items-center justify-center py-3 px-4  gap-4 bg-secondary-900 w-full rounded-full mb-8 text-gray-100">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-4 h-4" />
            Ingresa con google
          </button>
          <div className="relative mb-4">
            <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input 
              type="email" 
              className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg " 
              placeholder="user"
            />
          </div>
          <div className="relative mb-8">
            <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
            <input 
              type={showPassword ? "text" : "password"  }
              className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg" 
              placeholder="password"
            />
            {
              showPassword ? (
                <RiEyeOffLine 
                  onClick={()=>{ setShowPassword(!showPassword) }}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary" 
                />
              ):
              <RiEyeLine 
                  onClick={()=>{ setShowPassword(!showPassword) }}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary" 
                />
            }
          </div>
          <div>
            <button 
              type="submit" 
              className="bg-primary text-black w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors uppercase "
              onClick={onLogin}
              >
              Ingresar
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-4 items-center ">
            <Link to="/forgot-password" className="hover:text-primary transition-colors"> ¿Olvidaste tu contraseña? </Link>
            <span className="flex items-center gap-2">
              ¿No tienes cuenta?
              <Link 
                to="/register" 
                className="text-primary/80 hover:text-gray-100 transition-colors" > Registrate </Link>
            </span>
        </div>
      </div>
    </div>
  )
}

export default Login