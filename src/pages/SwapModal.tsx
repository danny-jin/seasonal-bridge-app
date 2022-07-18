import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { networks, NetworkIds } from "../networks";
import { ethWeb3, getContract, SwapTypes } from "../core/constants/base";

import { useWeb3Context } from "../hooks/web3Context";

export const SwapModal = (props: any):JSX.Element => {
  const { address } = useWeb3Context();
  const buttonStyle = 'p-10 px-20 border-2 border-vavewl m-10';
  const [approved, setApproved] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const ethBridgeAddress = networks[NetworkIds.Rinkeby].addresses.ETH_BRIDGE;
  const bscBridgeAddress = networks[NetworkIds.BscTestnet].addresses.BSC_BRIDGE;

  useEffect(() => {
    if ( address === '')
      return;
    const getAllowance = async (contract: any, targetAddr:any) => {
      // sendMessage();
      const allowAmount = await contract.methods.allowance(address, targetAddr).call();
      console.log('[Allowance] : ', allowAmount);
      setApproved(allowAmount !== '0');
    };
    if (props.type === SwapTypes.ETH_TO_BSC) {
      const seasonContract = getContract(NetworkIds.Rinkeby, props.season);
      getAllowance(seasonContract, ethBridgeAddress);
    }
    if (props.type === SwapTypes.BSC_TO_ETH) {
      const seasonContract = getContract(NetworkIds.BscTestnet, props.season);
      getAllowance(seasonContract, bscBridgeAddress);
    }
  }, [props.season, props.open]);

  const doApproveSeasonToken = async () => {
    if ( address === '')
      return;

    let seasonContract = getContract(NetworkIds.Rinkeby, props.season);
    let bridgeAddress = bscBridgeAddress;
    if (props.type === SwapTypes.ETH_TO_BSC) {
      seasonContract = getContract(NetworkIds.Rinkeby, props.season);
      bridgeAddress = ethBridgeAddress;
    }
    if (props.type === SwapTypes.BSC_TO_ETH) {
      seasonContract = getContract(NetworkIds.BscTestnet, props.season);
      bridgeAddress = bscBridgeAddress;
    }

    setSwapLoading(true);
    try{
      await seasonContract.methods.approve(bridgeAddress, '10000000000000000000000000000000000').send({ from: address });
      setApproved(true);
    }
    catch(error){
      console.log(error);
      setApproved(false);
    }
    setSwapLoading(false);
  };

  const doSwapSeasonToken = async () => {
    if ( address === '' || swapLoading === true )
      return;

    let seasonAddress = networks[NetworkIds.Rinkeby].addresses[props.season];
    const weiAmount = ethWeb3.utils.toWei(props.amount.toString(), 'ether');
    setSwapLoading(true);
    if (props.type === SwapTypes.ETH_TO_BSC) {
      seasonAddress = networks[NetworkIds.Rinkeby].addresses[props.season];
      try{
        await getContract(NetworkIds.Rinkeby, 'ETH_BRIDGE').methods.swapFromEth(seasonAddress, weiAmount).send({ from: address });
      }
      catch(error){
        console.log(error);
        setSwapLoading(false);
      }
    }
    if (props.type === SwapTypes.BSC_TO_ETH) {
      seasonAddress = networks[NetworkIds.BscTestnet].addresses[props.season];
      try{
        await getContract(NetworkIds.BscTestnet, 'BSC_BRIDGE').methods.swapFromBsc(seasonAddress, weiAmount).send({ from: address });
      }
      catch(error){
        console.log(error);
        setSwapLoading(false);
      }
    }
  };
  useEffect(() => {
    props.websocket.on('Swap Finished',() => {
      setSwapLoading(false);
      props.onSwapAfter();
    });
  }, [props.websocket]);
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
            props.type === SwapTypes.ETH_TO_BSC ? ( <label>Swap from ETH To BSC</label> ) :
              ( props.type === SwapTypes.BSC_TO_ETH ? ( <label>Swap from BSC TO ETH</label> ) : 
                ( <label>Your token amount is less than swap amount.</label> )
              )
          }</Box>
          <Box className="m-10">
            <Box>{props.season} : {props.amount}</Box>
          </Box>
          {
            (props.type === SwapTypes.ETH_TO_BSC || props.type === SwapTypes.BSC_TO_ETH) &&
              ( 
                <Box>
                  {
                    swapLoading ?
                      ( <Box ml="5px" className="flex justify-center"><ReactLoading type="spinningBubbles" color="#f00" width={ 50 } height={ 50 } /></Box> )
                      : (
                        <Box className="m-10">
                        {
                          approved === false ? ( <button className={buttonStyle} onClick={doApproveSeasonToken}>Approve</button> ) : ( <button className={buttonStyle} onClick={doSwapSeasonToken}>Swap</button> )
                        }
                        </Box> )
                  }
                </Box>
              )
          }
        </Box>
      </Fade>
    </Modal>
  );
};