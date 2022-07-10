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
        <div className="flex flex-grow overflow-hidden">
          <div className="flex-grow w-full h-full bg-background-cerberus-flat bg-no-repeat bg-85% bg-center
          pt-55 md:pt-85 px-10 pb-10 overflow-y-auto scrollbar-hide">{children}</div>
        </div>
      </div>
    )
  }
  
  export default Layout;
  