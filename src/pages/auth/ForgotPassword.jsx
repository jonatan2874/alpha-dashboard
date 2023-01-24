import React from 'react';
import { Link } from 'react-router-dom';
//icons
import {
          RiMailLine, 
        } from "react-icons/ri"

const ForgotPassword = () => {
  

  return (
    <div className="bg-secondary-100 p-8 rounded-xl shadow-xl" >
      <h1 className="text-3xl text-center font-bold tracking-[5px] text-white mb-8 w-auto lg:w-[450px]">Recuperar contraseña</h1>
      <form className="mb-8">
        <div className="relative mb-4">
          <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
          <input 
            type="email" 
            className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg " 
            placeholder="Email"
          />
        </div>
        <div>
          <button 
            type="submit" 
            className="bg-primary text-black w-full py-3 px-4 rounded-lg hover:text-gray-100 transition-colors uppercase ">
            Recuperar
          </button>
        </div>
        </form>
        <span className="flex items-center justify-center gap-2 mb-4">
            Ya tienes cuenta?
            <Link 
                to="/auth" 
                className="text-primary/80 hover:text-gray-100 transition-colors" > Ingresa </Link>
        </span>
        <span className="flex items-center justify-center gap-2">
            ¿No tienes cuenta?
            <Link 
                to="/auth/register" 
                className="text-primary/80 hover:text-gray-100 transition-colors" > Registrate </Link>
        </span>
    </div>
  )
}

export default ForgotPassword