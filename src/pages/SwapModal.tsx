import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { SeasonalTokens } from "../core/constants/base";

import { useWeb3Context } from "../hooks/web3Context";
import {
    etherWeb3,
    EthSeasonalContracts,
    bscWeb3,
    BscSeasonalContracts,} from '../core/constants/base';

const SwapModal = (props: any) => {
  const { connected, address } = useWeb3Context();
  const buttonStyle = 'p-10 px-20 border-2 border-vavewl m-10';
  const [approved, setApproved] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const etherBridgeContract = EthSeasonalContracts[4];
  const bscBridgeContract = EthSeasonalContracts[4];

  useEffect(() => {
    if ( address == '')
      return;
    const getAllowance = async (contract: any, targetAddr:any) => {
      const allowAmount = await contract.methods.allowance(address, targetAddr).call();
      // console.log('[Allowance] : ',allowAmount);
      setApproved(allowAmount != '0');
    };
    if (props.type == 'eth2bsc') {
      const seasonContract = EthSeasonalContracts[props.season];
      getAllowance(seasonContract, etherBridgeContract.options.address);
    }
  }, [props.season]);
  const doApproveSeasonToken = async () => {
    if ( address == '')
      return;

    let seasonContract = EthSeasonalContracts[props.season];
    let bridgeAddress = bscBridgeContract.options.address;
    if (props.type == 'eth2bsc') {
      seasonContract = EthSeasonalContracts[props.season];
      bridgeAddress = etherBridgeContract.options.address;
    }
    if (props.type == 'bsc2eth') {
      seasonContract = BscSeasonalContracts[props.season];
      bridgeAddress = bscBridgeContract.options.address;
    }

    setSwapLoading(true);
    try{
      let data = await seasonContract.methods.approve(bridgeAddress, '10000000000000000000000000000000000').send({ from: address });
      setApproved(true);
    }
    catch(error){
      console.log(error);
      setApproved(false);
    }
    setSwapLoading(false);
  };

  const doSwapSeasonToken = async () => {
    if ( address == '')
      return;

    let seasonContract = EthSeasonalContracts[props.season];
    const weiAmount = etherWeb3.utils.toWei(props.amount.toString(), 'ether');
    console.log('[start swap : token amount] : ', weiAmount);
    setSwapLoading(true);
    if (props.type == 'eth2bsc') {
      seasonContract = EthSeasonalContracts[props.season];
      try{
        let data = await etherBridgeContract.methods.swapFromEth(seasonContract.options.address, weiAmount).send({ from: address });
        props.onSwapAfter();
        setApproved(true);
      }
      catch(error){
        console.log(error);
        setApproved(false);
      }
    }
    if (props.type == 'bsc2eth') {
      seasonContract = BscSeasonalContracts[props.season];
      try{
        let data = await bscBridgeContract.methods.swapFromBsc(seasonContract.options.address, weiAmount).send({ from: address });
        props.onSwapAfter();
        setApproved(true);
      }
      catch(error){
        console.log(error);
        setApproved(false);
      }
    }
    setSwapLoading(false);
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
                    approved == false ? ( <button className={buttonStyle} onClick={doApproveSeasonToken}>Approve</button> ) : 
                      ( <button className={buttonStyle} onClick={doSwapSeasonToken}>Swap</button> )
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