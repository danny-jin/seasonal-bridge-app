import { Box, Grid } from "@material-ui/core";
import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";

import { useWeb3Context } from "./hooks/web3Context";

import Layout from './layout';
import EthTokenSection from './pages/EthTokenSection';
import BscTokenSection from './pages/BscTokenSection';
import {etherWeb3, EthSeasonalContracts} from './core/constants/base';
import './App.css';

function App() {
  const { connected, address } = useWeb3Context();
  const swapButtonsStyle = 'rounded-md bg-paarl hover:bg-corvette w-200 text-white hover:text-black p-10 font-semibold m-5 b-1';
  const [season,setSeason] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);
  const [bscAmount, setBscAmount] = useState(0);
  const handleChange = (event: any) => {
    setSeason(event.target.value as number);
  };
  useEffect(() => {
    if (address != ''){
      const getTokenAmounts = async () => {
        try {
          const ethSeasonalContract = EthSeasonalContracts[season];
          const ethAmount = await ethSeasonalContract.methods.balanceOf(address).call();
          const format = parseFloat(etherWeb3.utils.fromWei(ethAmount, 'ether'));
          setEthAmount(format);
          setBscAmount(100);
        } catch (error) {
          console.log(error);
        }
      };
      getTokenAmounts();
    }
    else {
      setEthAmount(0);
      setBscAmount(0);
    }
  }, [season, connected]);
  return (
    <Layout>
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Ethereum</Box>
          <EthTokenSection season={season} onChange={handleChange} amount={ethAmount}/>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <div>
            <button className={ swapButtonsStyle }>Swap from Eth to  Bsc</button>
            <button className={ swapButtonsStyle }>Swap from Bsc to Eth</button>
          </div>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Binance Smart Chain</Box>
          <BscTokenSection season={season} onChange={handleChange} amount={bscAmount}/>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
