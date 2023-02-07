import {useContext} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// layout
import LayoutMain from '../layouts/LayoutMain';

//pages auth
import  Login  from '../pages/auth/Login';
import  Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

//pages admin
import  Home  from '../pages/admin/Home';
import Chat from '../pages/admin/Chat';
import Profile from '../pages/admin/Profile';

import  Error404  from '../pages/Error404';
import Tickets from '../pages/admin/Tickets';

import { AuthContext } from '../context/auth';

const AppRouter = () => {
  const {theme} = useContext(AuthContext);
  
  return (
          <div className={theme=='dark'? 'theme-dark' : 'theme-light'}>
            <BrowserRouter >
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/forgot-password" element={<ForgotPassword/>} />

                    <Route path="/" element={<LayoutMain/>} >
                      <Route index element={<Home/>} />
                      <Route path="chat" element={<Chat/>} />
                      <Route path="profile" element={<Profile/>} />
                      <Route path="tickets" element={<Tickets />} />
                      <Route path="*" element={<Error404/>} />
                    </Route>

                    <Route path="*" element={<Error404/>} />

                </Routes>
            </BrowserRouter >
          </div>
  )
}

export default AppRouter