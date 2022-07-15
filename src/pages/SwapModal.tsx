import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { SeasonalTokens } from "../core/constants/base";

import { useWeb3Context } from "../hooks/web3Context";
import {etherWeb3, EthSeasonalContracts, ethBridge, etherBridgeAddr, bscWeb3, BscSeasonalContracts, bscBridge} from '../core/constants/base';

const pvKey = 'e8d65c0917a9382566dd96d75eec567805398039a2a3b58df6179f20bc67e527';

const SwapModal = (props: any) => {
  const { connected, address } = useWeb3Context();
  const buttonStyle = 'p-10 px-20 border-2 border-vavewl m-10';
  const [approved, setApproved] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);

  useEffect(() => {
    if ( address == '')
      return;
    const getAllowance = async (contract: any, targetAddr:any) => {
      const allowAmount = await contract.methods.allowance(address, targetAddr).call();
      console.log('[Allowance] : ',allowAmount);
      setApproved(allowAmount != '0');
    };
    if (props.type == 'eth2bsc') {
      const seasonContract = EthSeasonalContracts[props.season];
      getAllowance(seasonContract, etherBridgeAddr);
    }
  }, [props.season]);
  const doSeasonTokenApprove = async () => {
    if ( address == '')
      return;
    if (props.type == 'eth2bsc') {
      setSwapLoading(true);
      const seasonContract = EthSeasonalContracts[props.season];
      try{
        console.log("[Approving] : ", address, etherBridgeAddr);
        let data = await seasonContract.methods.approve(etherBridgeAddr, '10000000000000000000000000000000000').send({ from: address });
        console.log("[data] : ", data);
        setApproved(true);
      }
      catch(error){
        console.log(error);
        setApproved(false);
      }
      setSwapLoading(false);
    }
  };

  const doSeasonTokenSwap = () => {

  };

  const onCloseSwapModal = () => {
    if (!swapLoading)
      props.onClose(null);
  }
  return (
    <Modal open={props.open} onClose={onCloseSwapModal}>
      <Fade in={props.open}>
        <Box className="swap-modal" padding="20px">
          <Box>
          {
            props.type == "eth2bsc" ? ( <label>Swap from ETH To BSC</label> ) :
              ( props.type == 'bsc2eth' ? ( <label>Swap from BSC TO ETH</label> ) : 
                ( <label>Your token amount is less than swap amount.</label> )
              )
          }</Box>
          <Box className="m-10">
            <Box>{SeasonalTokens[props.season].name} : {props.amount}</Box>
          </Box>
          {
            (props.type == "eth2bsc" || props.type == "bsc2eth") &&
              ( 
                <Box>
                  <Box className="m-10">
                  {
                    approved == false ? ( <button className={buttonStyle} onClick={doSeasonTokenApprove}>Approve</button> ) : 
                      ( <button className={buttonStyle} onClick={doSeasonTokenSwap}>Swap</button> )
                  }
                  </Box>
                  {
                    swapLoading &&
                      <Box ml="5px"><ReactLoading type="spinningBubbles" color="#f00" width={ 25 } height={ 25 } /></Box>
                  }
                </Box>
              )
          }
        </Box>
      </Fade>
    </Modal>
  );
};

export default SwapModal;