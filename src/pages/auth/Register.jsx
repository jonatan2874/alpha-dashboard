import React,{useState} from 'react';
import { Link } from 'react-router-dom';
//icons
import {
          RiMailLine, 
          RiLockLine, 
          RiEyeLine,
          RiEyeOffLine,
          RiUserLine
        } from "react-icons/ri"

const Register = () => {
  const [showPassword,setShowPassword] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-xl" >
      <h1 className="text-3xl text-center font-bold tracking-[5px] text-white mb-8 w-auto lg:w-[450px]">Crear cuenta</h1>
      <form className="mb-8">
        <button className="flex items-center justify-center py-3 px-4  gap-4 bg-secondary-900 w-full rounded-full mb-8 text-gray-100">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="w-4 h-4" />
          Registrate con google
        </button>
        <div className="relative mb-4">
          <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input 
            type="email" 
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg " 
            placeholder="Nombre"
          />
        </div>
        <div className="relative mb-4">
          <RiUserLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input 
            type="email" 
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg " 
            placeholder="Apellido"
          />
        </div>
        <div className="relative mb-4">
          <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input 
            type="email" 
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg " 
            placeholder="email"
          />
        </div>
        <div className="relative mb-4">
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
        <div className="relative mb-8">
          <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input 
            type={showPassword ? "text" : "password"  }
            className="py-3 pl-8 pr-8 bg-secondary-900 w-full outline-none rounded-lg" 
            placeholder="Confirmar Password"
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
            className="bg-primary text-black w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors uppercase ">
            Registrarme
          </button>
        </div>
      </form>
        <span className="flex items-center justify-center gap-2">
          ¿Ya tienes cuenta?
          <Link 
            to="/login" 
            className="text-primary/80 hover:text-gray-100 transition-colors" > Ingresa </Link>
        </span>
    </div>
    </div>
  )
}

export default Register