import Web3 from 'web3';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  walletAddress: '',
  currentSeason: 0,
};

export const bridgeSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWalletAddress(state, action) {
      state.walletAddress = action.payload;
    },
    changeSeasonal(state, action) {
      state.currentSeason = action.payload;
      console.log("currentSeason:", state.currentSeason);
    }
  }
});

export const { setWalletAddress, getSeasonalTokens, changeSeasonal } = bridgeSlice.actions;
export default bridgeSlice.reducer;
