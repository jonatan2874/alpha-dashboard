import React,{useContext, useEffect, useState} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/auth';
import { AuthContext } from '../../context/auth';
import { useNavigate } from "react-router-dom";

const Unauthorize = () => {
  console.log("in")
  const {user,is_auth} = useContext(AuthContext);
  console.log(is_auth)
  // const { login } = useContext(AuthContext);
  // const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();
  // if(!is_auth){
  //   navigate('/login');
  //   // <Navigate to="/login" replace={true} />
  // }

  // useEffect(() => {
  //   if (!is_auth) {
  //     navigate('/login');
  //   }
  // }, [is_auth, navigate]);
  // useEffect(() => {
  //   navigate('/login');
  // }, []); 


  // const onLogin = ()=>{
  //   login('jonatan');
  //   navigate('/',{
  //     replace : true
  //   }

  //   );  
  // }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-900 text-gray-300">
      <div className="bg-secondary-100 p-8 rounded-xl shadow-xl" >
        <h1 className="text-3xl text-center font-bold tracking-[5px] text-white mb-8 w-auto lg:w-[450px]">Acceso prohibido</h1>
      </div>
    </div>
  )
}

export default Unauthorize