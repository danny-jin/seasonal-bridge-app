import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../components/Nav';
import { RootState } from '../core/store/store';
import { toggleSidebar } from '../core/store/slice/bridgeSlice';

const Layout = ({children}: any) => {
    const dispatch = useDispatch();
  
    const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  
    const closeSidebar = () => {
      if (!isCollapsed) {
        dispatch(toggleSidebar())
      }
    }
    return (
      <div className="flex flex-col w-full h-screen">
        <div className="w-full fixed z-10 border-2 border-black">
          <Navbar/>
        </div>
        <div className="flex justify-between overflow-hidden mt-85">
          {children}
        </div>
      </div>
    )
  }
  
  export default Layout;
  