import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { networks, NetworkIds } from "../networks";
import { ethWeb3, getContract } from "../core/constants/base";

import { useWeb3Context } from "../hooks/web3Context";

const SwapModal = (props: any) => {
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
      const allowAmount = await contract.methods.allowance(address, targetAddr).call();
      console.log('[Allowance] : ',allowAmount);
      setApproved(allowAmount !== '0');
    };
    if (props.type === 'eth2bsc') {
      const seasonContract = getContract(NetworkIds.Rinkeby, props.season);
      getAllowance(seasonContract, ethBridgeAddress);
    }
    if (props.type === 'bsc2eth') {
      const seasonContract = getContract(NetworkIds.BscTestnet, props.season);
      getAllowance(seasonContract, bscBridgeAddress);
    }
  }, [props.season, props.open]);

  const doApproveSeasonToken = async () => {
    if ( address === '')
      return;

    let seasonContract = getContract(NetworkIds.Rinkeby, props.season);
    let bridgeAddress = bscBridgeAddress;
    if (props.type === 'eth2bsc') {
      seasonContract = getContract(NetworkIds.Rinkeby, props.season);
      bridgeAddress = ethBridgeAddress;
    }
    if (props.type === 'bsc2eth') {
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
    if (props.type === 'eth2bsc') {
      seasonAddress = networks[NetworkIds.Rinkeby].addresses[props.season];
      try{
        await getContract(NetworkIds.Rinkeby, 'ETH_BRIDGE').methods.swapFromEth(seasonAddress, weiAmount).send({ from: address });
        props.onSwapAfter();
        setApproved(true);
      }
      catch(error){
        console.log(error);
      }
    }
    if (props.type === 'bsc2eth') {
      seasonAddress = networks[NetworkIds.BscTestnet].addresses[props.season];
      try{
        await getContract(NetworkIds.BscTestnet, 'BSC_BRIDGE').methods.swapFromBsc(seasonAddress, weiAmount).send({ from: address });
        props.onSwapAfter();
        setApproved(true);
      }
      catch(error){
        console.log(error);
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
            props.type === "eth2bsc" ? ( <label>Swap from ETH To BSC</label> ) :
              ( props.type === 'bsc2eth' ? ( <label>Swap from BSC TO ETH</label> ) : 
                ( <label>Your token amount is less than swap amount.</label> )
              )
          }</Box>
          <Box className="m-10">
            <Box>{props.season} : {props.amount}</Box>
          </Box>
          {
            (props.type === "eth2bsc" || props.type === "bsc2eth") &&
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

export default SwapModal;