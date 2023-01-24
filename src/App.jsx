import {BrowserRouter,Routes,Route} from 'react-router-dom'

// layout
import LayoutAdmin from './layouts/LayoutAdmin';
import LayOutAuth from './layouts/LayOutAuth';

//pages auth
import  Login  from './pages/auth/Login';
import  Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

//pages admin
import  Home  from './pages/admin/Home';
import Chat from './pages/admin/Chat';

import  Error404  from './pages/Error404';

function App() {

  return (
    <BrowserRouter >
      <Routes>

        <Route path="/auth" element={<LayOutAuth/>} >
          <Route index element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
        </Route>

        <Route path="/" element={<LayoutAdmin/>} >
          <Route index element={<Home/>} />
          <Route path="chat" element={<Chat/>} />
        </Route>

        <Route path="*" element={<Error404/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
