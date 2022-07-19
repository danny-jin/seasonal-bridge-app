import { Box, Modal, Fade } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useDispatch } from "react-redux";

import { info, error } from "../core/store/slices/MessagesSlice";
import { networks, NetworkIds } from "../networks";
import { useWeb3Context } from "../hooks/web3Context";
import { ethWeb3, getContract, SwapTypes, SeasonalTokens } from "../core/constants/base";

export const SwapModal = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const {address} = useWeb3Context();
  const buttonStyle = 'p-10 px-20 border-2 border-vavewl m-10';
  const [swapLoading, setSwapLoading] = useState(false);
  const ethBridgeAddress = networks[NetworkIds.Rinkeby].addresses.ETH_BRIDGE;
  const bscBridgeAddress = networks[NetworkIds.BscTestnet].addresses.BSC_BRIDGE;

  const doApproveSeasonToken = async () => {
    if (address === '')
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
    try {
      await seasonContract.methods.approve(bridgeAddress, '10000000000000000000000000000000000').send({from: address});
      props.setApproved(true);
      dispatch(info(`Approve token is finished.`));
    } catch (errorObj: any) {
      // console.log(errorObj);
      props.setApproved(false);
      dispatch(error(errorObj.message));
    }
    setSwapLoading(false);
  };

  const doSwapSeasonToken = async () => {
    if (address === '' || swapLoading)
      return;

    let seasonAddress = networks[NetworkIds.Rinkeby].addresses[props.season];
    const weiAmount = ethWeb3.utils.toWei(props.amount.toString(), 'ether');
    setSwapLoading(true);
    if (props.type === SwapTypes.ETH_TO_BSC) {
      seasonAddress = networks[NetworkIds.Rinkeby].addresses[props.season];
      try {
        await getContract(NetworkIds.Rinkeby, 'ETH_BRIDGE').methods.swapFromEth(seasonAddress, weiAmount).send({from: address});
      } catch (errorObj: any) {
        dispatch(error(errorObj.message));
        setSwapLoading(false);
      }
    }
    if (props.type === SwapTypes.BSC_TO_ETH) {
      seasonAddress = networks[NetworkIds.BscTestnet].addresses[props.season];
      try {
        await getContract(NetworkIds.BscTestnet, 'BSC_BRIDGE').methods.swapFromBsc(seasonAddress, weiAmount).send({from: address});
      } catch (errorObj: any) {
        dispatch(error(errorObj.message));
        setSwapLoading(false);
      }
    }
  };

  const onCloseSwapModal = () => {
    if (!swapLoading)
      props.onClose(null);
  }

  useEffect(() => {
    props.websocket.on('Swap Finished', () => {
      dispatch(info('Swap is finished!'));
      setSwapLoading(false);
      props.onSwapAfter();
      onCloseSwapModal();
    });
    props.websocket.on('error', (errorMsg: any) => {
      console.log(errorMsg);
      setSwapLoading(false);
    });
  }, [props.websocket]);

  return (
    <Modal open={ props.open } onClose={ onCloseSwapModal }>
      <Fade in={ props.open }>
        <Box className="swap-modal" padding="20px">
          <Box className="text-center">
            {
              props.type === SwapTypes.ETH_TO_BSC ? (
                  <label className="text-30 font-bold">Swap from ETH To BSC</label>) :
                (<label className="text-30 font-bold">Swap from BSC TO ETH</label>)
            }
            <button onClick={ onCloseSwapModal } className="float-right"><FontAwesomeIcon icon={ faTimes }/></button>
          </Box>
          <Box className="m-10">
            <Box className="flex items-center justify-center">
              { props.amount }
              <img src={ SeasonalTokens[props.season].img } className="w-30 mx-20"
                   alt={ SeasonalTokens[props.season].name }/>
            </Box>
          </Box>
          {
            <Box className="flex justify-center">
              {
                swapLoading ?
                  (<Box ml="5px" className="flex justify-center"><ReactLoading type="spinningBubbles" color="#FACB99"
                                                                               width={ 50 } height={ 50 }/></Box>)
                  : (
                    <Box className="">
                      {
                        props.approved === false ? (
                          <button className={ buttonStyle } onClick={ doApproveSeasonToken }>Approve</button>) : (
                          <button className={ buttonStyle } onClick={ doSwapSeasonToken }>Swap</button>)
                      }
                    </Box>)
              }
            </Box>
          }
        </Box>
      </Fade>
    </Modal>
  );
};