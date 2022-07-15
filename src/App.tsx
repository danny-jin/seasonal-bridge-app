import { Box, Grid } from "@material-ui/core";
import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";

import { useWeb3Context } from "./hooks/web3Context";

import Layout from "./layout";
import SwapModal from "./pages/swapModal";
import EthTokenSection from './pages/EthTokenSection';
import BscTokenSection from './pages/BscTokenSection';
import {etherWeb3, EthSeasonalContracts, bscWeb3, BscSeasonalContracts} from './core/constants/base';
import './App.css';
function App() {
  const { connected, connect, address } = useWeb3Context();
  const swapButtonsStyle = 'rounded-md bg-paarl hover:bg-corvette w-200 text-white hover:text-black p-10 font-semibold m-5 b-1';
  const [season,setSeason] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);
  const [bscAmount, setBscAmount] = useState(0);
  const [swapType, setSwapType] = useState('eth2bsc');
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapEthAmount, setSwapEthAmount] = useState(100);
  const [swapBscAmount, setSwapBscAmount] = useState(100);

  const handleChange = (event: any) => {
    setSeason(event.target.value as number);
  };
  const swapEthMountInput = (event: any) => {
    setSwapEthAmount(event.target.value as number);
  };
  const swapBscMountInput = (event: any) => {
    setSwapBscAmount(event.target.value as number);
  };
  useEffect(() => {
    getCurrentAmount();
  }, [season, connected]);

  const getCurrentAmount = async () => {
    if (address != '') {
      try {
        const ethAmount = await EthSeasonalContracts[season].methods.balanceOf(address).call();
        const format = parseFloat(etherWeb3.utils.fromWei(ethAmount, 'ether'));
        setEthAmount(parseInt(ethAmount));
      } catch (error) {
        console.log(error);
      }

      try {
        const bscAmount = await BscSeasonalContracts[season].methods.balanceOf(address).call();
        const format = parseFloat(bscWeb3.utils.fromWei(bscAmount, 'ether'));
        setBscAmount(format);
      } catch (error) {
        console.log(error);
      }
    }
    else {
      setEthAmount(0);
      setBscAmount(0);
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
    if (type == 'eth2bsc') {
      setSwapAmount(swapEthAmount);
      if (parseFloat(swapEthAmount.toString()) > ethAmount) {
        setSwapType('big_amount');
        return;
      }
    }
    if (type == 'bsc2eth') {
      setSwapAmount(swapBscAmount);
      if (swapBscAmount > bscAmount) {
        setSwapType('big_amount');
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
          <EthTokenSection season={season} onChange={handleChange} amount={ethAmount} swapamount={swapEthAmount}  onSwapAmountChange = {swapEthMountInput}/>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <div>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal('eth2bsc')}>Swap from Eth to  Bsc</button>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal('bsc2eth')}>Swap from Bsc to Eth</button>
          </div>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Binance Smart Chain</Box>
          <BscTokenSection season={season} onChange={handleChange} amount={bscAmount} swapamount={swapBscAmount} onSwapAmountChange = {swapBscMountInput}/>
        </Grid>
      </Grid>
      <SwapModal type={ swapType } season={season} open={ swapModalOpen } onClose={ closeSwapModal } amount={swapAmount} onSwapAfter={getCurrentAmount}/>
    </Layout>
  );
}

export default App;
