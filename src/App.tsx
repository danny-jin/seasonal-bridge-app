import React from 'react';
import {
  Box,
  Typography,
  Zoom,
  Paper,
  Button, Grid, Tooltip,
} from "@material-ui/core";

import Layout from './layout';
import EthTokenSection from './pages/EthTokenSection';
import BscTokenSection from './pages/BscTokenSection';
import './App.css';



function App() {
  return (
    <Layout>
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24">Ethereum</Box>
          <EthTokenSection></EthTokenSection>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 2 } className="justify-box flex flex-col justify-around">
          <Button variant="contained" color="primary">Swap Eth 2 Bsc</Button>
          <Button variant="contained" color="primary">Swap Bsc 2 Eth</Button>
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } md={ 5 } className="justify-box">
          <Box className="text-center text-24">Binance Smart Chain</Box>
          <BscTokenSection></BscTokenSection>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
