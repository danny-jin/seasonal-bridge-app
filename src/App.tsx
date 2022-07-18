import { Box, Grid } from "@material-ui/core";
import {useState, useEffect} from 'react';
import {io} from "socket.io-client";

import { useWeb3Context } from "./hooks/web3Context";
import Layout from "./layout";
import {SwapModal} from "./pages/SwapModal";
import {EthTokenSection} from './pages/EthTokenSection';
import BscTokenSection from './pages/BscTokenSection';
import {ethWeb3, bscWeb3, SeasonalTokens, SwapTypes, serverSocketUrl} from './core/constants/base';
import { NetworkIds } from "./networks";
import './App.css';

export const App = (): JSX.Element => {

  const { connected, connect, address, switchEthereumChain } = useWeb3Context();
  const swapButtonsStyle = 'rounded-md bg-paarl hover:bg-corvette w-200 text-white hover:text-black p-10 font-semibold m-5 b-1';
  const [season,setSeason] = useState('SPRING');
  const [ethAmount, setEthAmount] = useState('0');
  const [bscAmount, setBscAmount] = useState('0');
  const [swapType, setSwapType] = useState('');
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapEthAmount, setSwapEthAmount] = useState(100);
  const [swapBscAmount, setSwapBscAmount] = useState(100);
  const [socket, setSocket] = useState(io(serverSocketUrl));

  const handleChange = (event: any) => {
    setSeason(event.target.value);
  };
  const swapEthMountInput = (event: any) => {
    setSwapEthAmount(event.target.value as number);
  };
  const swapBscMountInput = (event: any) => {
    setSwapBscAmount(event.target.value as number);
  };
  useEffect(() => {
  }, []);

  useEffect(() => {
    getCurrentAmount().then();
  }, [season, connected]);

  const getCurrentAmount = async () => {
    if (address != '') {
      try {
        const ethAmount = await SeasonalTokens[season].ethContract.methods.balanceOf(address).call();
        const format = ethWeb3.utils.fromWei(ethAmount, 'ether');
        setEthAmount(format);
      } catch (error) {
        console.log(error);
      }

      try {
        const bscAmount = await SeasonalTokens[season].bscContract.methods.balanceOf(address).call();
        const format = bscWeb3.utils.fromWei(bscAmount, 'ether');
        setBscAmount(format);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      setEthAmount('0');
      setBscAmount('0');
    }
  };
  const openSwapModal = async (type:string) => {
    if(!connected){
      try {
        await connect();
      }
      catch(error){
        console.log(error);
        return;
      }
    }
    setSwapModalOpen(true);
    if (type === SwapTypes.ETH_TO_BSC) {
      await switchEthereumChain(NetworkIds.Rinkeby, true);
      setSwapAmount(swapEthAmount);
      if (parseFloat(swapEthAmount.toString()) > parseFloat(ethAmount)) {
        setSwapType(SwapTypes.BIG_AMOUNT);
        return;
      }
    }
    if (type === SwapTypes.BSC_TO_ETH) {
      await switchEthereumChain(NetworkIds.BscTestnet, true);
      setSwapAmount(swapBscAmount);
      if (parseFloat(swapBscAmount.toString()) > parseFloat(bscAmount)) {
        setSwapType(SwapTypes.BIG_AMOUNT);
        return;
      }
    }
    setSwapType(type);
  };
  const closeSwapModal = () => {
    setSwapModalOpen(false);
  };
  
  return (
    <Layout>
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Ethereum</Box>
          <EthTokenSection season={season} onChange={handleChange} amount={ethAmount} swapAmount={swapEthAmount}  onSwapAmountChange = {swapEthMountInput}/>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <div>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal(SwapTypes.ETH_TO_BSC)}>Swap from Eth to  Bsc</button>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal(SwapTypes.BSC_TO_ETH)}>Swap from Bsc to Eth</button>
          </div>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Binance Smart Chain</Box>
          <BscTokenSection season={season} onChange={handleChange} amount={bscAmount} swapAmount={swapBscAmount} onSwapAmountChange = {swapBscMountInput}/>
        </Grid>
      </Grid>
      <SwapModal type={ swapType } season={season} open={ swapModalOpen } onClose={ closeSwapModal } amount={swapAmount} onSwapAfter={getCurrentAmount} websocket={socket}/>
    </Layout>
  );
}