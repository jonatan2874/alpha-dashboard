import React,{useContext} from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/Header';

const LayoutMain = () => {
    return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 ">
      <Sidebar/>
      <div className="xl:col-span-5 bg-secondary-900">
        <Header/>
        <div className="h-[90vh] overflow-y-scroll p-8">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default LayoutMain