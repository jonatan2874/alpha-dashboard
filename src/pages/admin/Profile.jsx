import React from 'react'
//icons
import {
    RiEdit2Line
  } from "react-icons/ri"

  import { Button,TextField } from '@mui/material'

const Profile = () => {
  return (
    <div className='bg-secondary-100 p-8 rounded-xl'>
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
            <div className='flex items-center'>
                <div className='w-1/4'>
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
  )
}

export default Profile