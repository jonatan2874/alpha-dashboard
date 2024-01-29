import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LeftBar, RightBar } from './components/sidebars';
import Header from './components/Header';
import TwAlert from '../components/ui/Alert';

const LayoutMain = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 ">
      <LeftBar />
      <div className="xl:col-span-5 bg-secondary-900">
        <Header />
        <div className="h-[90vh] overflow-y-scroll p-8">
          <Outlet />
        </div>
      </div>
      <RightBar />
      <TwAlert />
    </div>
  )
}

export default LayoutMain