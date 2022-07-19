import { Box, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import useForceUpdate from 'use-force-update';

import { useWeb3Context } from './hooks/web3Context';
import Layout from './layout';
import { SwapModal } from './pages/SwapModal';
import { LoadingModal } from './pages/LoadingModal';
import { EthTokenSection } from './pages/EthTokenSection';
import { BscTokenSection } from './pages/BscTokenSection';
import { ethWeb3, bscWeb3, SeasonalTokens, SwapTypes, serverSocketUrl, getContract} from './core/constants/base';
import { networks, NetworkIds } from './networks';
import Messages from './components/Messages/Messages';
import { error } from './core/store/slices/MessagesSlice';
import './App.css';

export const App = (): JSX.Element => {

  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const { connected, connect, address, switchEthereumChain } = useWeb3Context();
  const swapButtonsStyle = 'rounded-md bg-paarl hover:bg-corvette w-200 text-white hover:text-black p-10 font-semibold m-5 b-1';
  const [season, setSeason] = useState('SPRING');
  const [swapType, setSwapType] = useState('');
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [swapAmount, setSwapAmount] = useState(0);
  const [swapEthAmount, setSwapEthAmount] = useState(100);
  const [swapBscAmount, setSwapBscAmount] = useState(100);
  const [approved, setApproved] = useState(false);
  const ethBridgeAddress = networks[NetworkIds.Rinkeby].addresses.ETH_BRIDGE;
  const bscBridgeAddress = networks[NetworkIds.BscTestnet].addresses.BSC_BRIDGE;
  const socket = io(serverSocketUrl);

  const handleChange = (event: any) => {
    setSeason(event.target.value);
  };
  const swapEthAmountInput = (event: any) => {
    setSwapEthAmount(event.target.value as number);
  };
  const swapBscAmountInput = (event: any) => {
    setSwapBscAmount(event.target.value as number);
  };
  const getCurrentAmount = async (season: string) => {
    if (address !== '') {
      try {
        const ethAmount = await SeasonalTokens[season].ethContract.methods.balanceOf(address).call();
        const format = ethWeb3.utils.fromWei(ethAmount, 'ether');
        SeasonalTokens[season].ethAmount = format;
      } catch (error) {
        console.log(error);
      }

      try {
        const bscAmount = await SeasonalTokens[season].bscContract.methods.balanceOf(address).call();
        const format = bscWeb3.utils.fromWei(bscAmount, 'ether');
        SeasonalTokens[season].bscAmount = format;
      } catch (error) {
        console.log(error);
      }
    }
    else {
      SeasonalTokens[season].ethAmount = '0';
      SeasonalTokens[season].bscAmount = '0';
    }
    forceUpdate();
  };

  const openSwapModal = async (type:string) => {
    if(!connected){
      setLoadModalOpen(true);
      try {
        await connect();
      }
      catch(error){
        console.log(error);
        setLoadModalOpen(false);
        return;
      }
      setLoadModalOpen(false);
    }

    const getAllowance = async (contract: any, targetAddr:any) => {
      const allowAmount = await contract.methods.allowance(address, targetAddr).call();
      setApproved(allowAmount !== '0');
    };

    if (type === SwapTypes.ETH_TO_BSC) {
      setLoadModalOpen(true);
      let changedNetwork = await switchEthereumChain(NetworkIds.Rinkeby, true);
      setLoadModalOpen(false);
      if (!changedNetwork)
        return;
      setSwapAmount(swapEthAmount);
      const seasonContract = getContract(NetworkIds.Rinkeby, season);
      getAllowance(seasonContract, ethBridgeAddress).then();
      if (parseFloat(swapEthAmount.toString()) > parseFloat(SeasonalTokens[season].ethAmount)) {
        dispatch(error('Swap amount is bigger than current amount'));
        return;
      }
      if (parseFloat(swapEthAmount.toString()) < 100) {
        dispatch(error('Minimum swap amount is 100!'));
        return;
      }
    }

    if (type === SwapTypes.BSC_TO_ETH) {
      setLoadModalOpen(true);
      let changedNetwork = await switchEthereumChain(NetworkIds.BscTestnet, true);
      setLoadModalOpen(false);
      if (!changedNetwork)
        return;
      setSwapAmount(swapBscAmount);
      const seasonContract = getContract(NetworkIds.BscTestnet, season);
      getAllowance(seasonContract, bscBridgeAddress);
      if (parseFloat(swapBscAmount.toString()) > parseFloat(SeasonalTokens[season].bscAmount)) {
        dispatch(error('Swap amount is bigger than current amount'));
        return;
      }
      if (parseFloat(swapBscAmount.toString()) < 100) {
        dispatch(error('Minimum swap amount is 100!'));
        return;
      }
    }
    setSwapModalOpen(true);
    setSwapType(type);
  };
  const closeSwapModal = () => {
    setSwapModalOpen(false);
  };
  useEffect(() => {
    if (address === '') return;
    Object.keys(SeasonalTokens).forEach((season: string) => {
      getCurrentAmount(season);
    });
  }, [address]);

  // useEffect(() => {
  //   getCurrentAmount(season);
  // }, [season]);

  return (
    <Layout>
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Ethereum</Box>
          <EthTokenSection season={season} onChange={handleChange} swapAmount={swapEthAmount}  onSwapAmountChange = {swapEthAmountInput}/>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <div>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal(SwapTypes.ETH_TO_BSC)}>Swap from Eth to  Bsc</button>
            <button className={ swapButtonsStyle } onClick={() => openSwapModal(SwapTypes.BSC_TO_ETH)}>Swap from Bsc to Eth</button>
          </div>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Binance Smart Chain</Box>
          <BscTokenSection season={season} onChange={handleChange} swapAmount={swapBscAmount} onSwapAmountChange = {swapBscAmountInput}/>
        </Grid>
      </Grid>
      <SwapModal type={ swapType } season={season} open={ swapModalOpen } onClose={ closeSwapModal } amount={swapAmount} onSwapAfter={getCurrentAmount} websocket={socket} approved={approved} setApproved={setApproved}/>
      <Messages />
      <LoadingModal open={ loadModalOpen }/>
    </Layout>
  );
}