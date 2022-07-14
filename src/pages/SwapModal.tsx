import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";
import { SeasonalTokens } from "../core/constants/base";

const SwapModal = (props: any) => {
  const buttonStyle = 'p-10 px-20 border-2 border-vavewl';
  return (
    <Modal open={props.open} onClose={() => props.onClose(null)}>
      <Fade in={props.open}>
        <Box className="swap-modal" padding="20px">
          <Box>
          {
            props.type == "eth2bsc" ? ( <label>Swap from ETH To BSC</label> ) :
              ( props.type == 'bsc2eth' ? ( <label>Swap from BSC TO ETH</label> ) : 
                ( <label>Your token amount is less than swap amount.</label> )
              )
          }</Box>
          <Box>
            <Box>{SeasonalTokens[props.season].name} : {props.amount}</Box>
          </Box>
          <Box>
            <button className={buttonStyle}>Approve</button>
            <button className={buttonStyle}>Swap</button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SwapModal;