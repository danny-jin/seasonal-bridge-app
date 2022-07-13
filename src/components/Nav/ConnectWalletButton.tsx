
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useWeb3Context } from "../../hooks/web3Context";
import { setWalletAddress, getSeasonalTokens } from "../../core/store/slice/bridgeSlice";

const ConnectWalletButton = () => {  
  const dispatch = useDispatch();
  const { connect, disconnect, address } = useWeb3Context();
  const walletAddress = useSelector((state:any) => {return state.app.walletAddress;});
  useEffect(()=>{
    // dispatch(setWalletAddress(address));
    dispatch(getSeasonalTokens(address));
  }, [address]);
  return (
    <div>
      {
        address == '' ? (
          <button className="rounded-md bg-gradient-to-r from-paarl to-corvette w-155 h-40 text-white font-semibold m-5 b-1" onClick={connect}>
            Connect
          </button> ) :
          (
            <button className="rounded-md bg-gradient-to-r from-paarl to-corvette w-155 h-40 text-white font-semibold m-5 b-1" onClick={disconnect}>
            Disconnect
            </button>
          )
      }
    </div>
  );
}

export default ConnectWalletButton;
