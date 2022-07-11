import { Box, Grid } from "@material-ui/core";
import React from 'react';

import Layout from './layout';
import EthTokenSection from './pages/EthTokenSection';
import BscTokenSection from './pages/BscTokenSection';
import './App.css';

function App() {

  const swapButtonsStyle = 'rounded-md bg-paarl hover:bg-corvette w-155 h-40 text-white hover:text-black font-semibold m-5 b-1';

  return (
    <Layout>
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Ethereum</Box>
          <EthTokenSection />
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <div>
            <button className={ swapButtonsStyle }>Swap from Eth to  Bsc</button>
            <button className={ swapButtonsStyle }>Swap from Bsc to Eth</button>
          </div>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24 m-10">Binance Smart Chain</Box>
          <BscTokenSection />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
