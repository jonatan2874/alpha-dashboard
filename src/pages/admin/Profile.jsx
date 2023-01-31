import React from 'react'
//icons
import {
    RiEdit2Line,
    RiShieldCheckLine
  } from "react-icons/ri"

  import { Button,TextField } from '@mui/material'

const Profile = () => {
  return (
    <>
        <div className='bg-secondary-100 p-8 rounded-xl mb-8'>
            <h1 className='text-xl text-gray-100'>Profile</h1>
            <hr className='my-8 border-gray-500'/>
            <form>
                <div className='flex items-center mb-8'>
                    <div className='w-1/4'>
                        <p>Avatar</p>
                    </div>
                    <div className='flex-1'>
                        <div className='relative mb-2'>
                            <img 
                                src="https://img.freepik.com/foto-gratis/retrato-joven-sonriente-gafas_171337-4842.jpg"  
                                className='w-28 h-28 object-cover rounded-lg' 
                            />
                            <label htmlFor="avatar" className='absolute p-2 rounded-full hover:cursor-pointer -top-2 left-24 bg-secondary-100'>
                                <RiEdit2Line />
                            </label>
                            <input type="file" id="avatar" className='hidden' />
                            
                        </div>
                        <p className='text-gray-500 text-sm'>Archivos permitidos: png, jpg, jpeg</p>
                    </div>
                </div>
                <div className='flex flex-col md:flex-row  items-center gap-y-2'>
                    <div className='w-full md:w-1/4'>
                        <p>Nombre Completo <span className='text-red-500'>*</span></p>
                    </div>
                    <div className='flex-1 flex items-center gap-4'>
                        <div className='w-full'>
                        <TextField 
                            className='w-full outline-none focus:outline-none rounded-lg bg-secondary-900 text-gray-500' id="outlined-basic" 
                            variant="filled"
                            placeholder="Placeholder"
                            size="small" 
                        />
                        </div>
                        <div className='w-full'>
                        <input className='w-full py-2 px-4 outline-none rounded-lg bg-secondary-900' type="text" name="" id="" placeholder='Apellidos'/>
                        </div>
                    </div>
                </div>
            </form>
            <hr className='my-8 border-gray-500'/>
            <div className='flex justify-end'>
                <Button variant="contained" className='bg-primary/80 hover:bg-primary transition-colors text-black'>Guardar</Button>
            </div>
        </div>
        <div className='bg-secondary-100 p-8 rounded-xl'>
            <h1 className='text-xl text-gray-100'>Security</h1>
            <hr className='my-8 border-gray-500'/>
            <form className='mb-6'>
                <div className='flex items-center justify-between'>
                    <div >
                        <h5 className='text-gray-100 text-xl'>Correo electronico</h5>  
                        <p className='text-gray-500 text-sm'>herran1212@hotmail.com</p>
                    </div>
                    <div>
                        <Button variant="contained" className='bg-secondary-900/50 hover:bg-secondary-900 text-gray-400 hover:text-gray-100 transition-colors py-3 px-4'>Cambiar email</Button>
                    </div>
                </div>
                <hr className='my-8 border-gray-500/30'/>
                <div className='flex items-center justify-between'>
                    <div >
                        <h5 className='text-gray-100 text-xl'>Contraseña</h5>  
                        <p className='text-gray-500 text-sm'>***********</p>
                    </div>
                    <div>
                        <Button variant="contained" className='bg-secondary-900/50 hover:bg-secondary-900 text-gray-400 hover:text-gray-100 transition-colors py-3 px-4'>Cambiar contraseña</Button>
                    </div>
                </div>
            </form>
            <div className='grid grid-cols-1 md:grid-cols-8 items-center bg-sky-500/10 p-4 rounded-lg border-dashed'>
                <div className='flex justify-center'>
                    <RiShieldCheckLine className='text-4xl'/>
                </div>
                <div className='md:col-span-6'>
                    <h5 className='text-gray-100 text-xl'>Asegure su cuenta</h5>
                    <p className='text-gray-500'>factor de autenticacion en dos pasos añade una capa extra de seguridad a la cuenta</p>
                </div>
                <div className='flex justify-center'>
                    <Button variant="contained" className='bg-secondary-900/50 hover:bg-secondary-900 text-gray-400 hover:text-gray-100 transition-colors py-3 px-4'>Activar</Button>
                </div>
            </div>
            <hr className='my-8 border-gray-500'/>
            <div className='flex justify-end'>
                <Button variant="contained" className='bg-primary/80 hover:bg-primary transition-colors text-black'>Guardar</Button>
            </div>
        </div>
    </>
  )
}

export default Profile