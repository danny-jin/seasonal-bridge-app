import React from 'react'
import { useDispatch } from 'react-redux';

import ConnectWalletButton from './ConnectWalletButton';
import { toggleSidebar } from '../../core/store/slice/bridgeSlice';

const Nav = () => {
  const dispatch = useDispatch();

  const openSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className="flex flex-row-reverse justify-between items-center w-full bg-black h-55 md:h-85 md:p-10">
      <ConnectWalletButton/>
    </div>
  )
}

export default Nav; 