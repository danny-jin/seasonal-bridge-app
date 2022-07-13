import Web3 from 'web3';
import { createSlice } from '@reduxjs/toolkit';
import { EthSeasonalContracts } from '../../constants/base';
const etherProvider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/8cabb9938294442cb313eaa69e9ba8cf");
const etherWeb3 = new Web3(etherProvider);

const initialState = {
  value: 0,
  status: 'idle',
  walletAddress: '',
};

export const bridgeSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWalletAddress(state, action){
      state.walletAddress = action.payload;
    },
    async getSeasonalTokens(state, action) {
      const currentAddress = action.payload;
      if ( currentAddress != '' ) {
        const result = await EthSeasonalContracts[0].methods.balanceOf(currentAddress).call(); // 29803630997051883414242659
        const format = etherWeb3.utils.fromWei(result, 'ether'); // 29803630.997051883414242659
        console.log(format);
        // const count = EthSeasonalContracts.map( async function(contract){
        //   const result = await contract.methods.balanceOf(currentAddress).call(); // 29803630997051883414242659
        //   const format = etherWeb3.utils.fromWei(result, 'ether'); // 29803630.997051883414242659
        //   return format;
        // });
        // console.log(count);
      }
    }
  }
});

export const { setWalletAddress, getSeasonalTokens } = bridgeSlice.actions;
export default bridgeSlice.reducer;
