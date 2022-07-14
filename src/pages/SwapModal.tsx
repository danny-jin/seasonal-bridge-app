import {
  Box,
  Modal,
  Fade
} from "@material-ui/core";

const SwapModal = (props: any) => {
  return (
    <Modal open={props.open} onClose={() => props.onClose(null)}>
      <Fade in={props.open}>
        <Box className="swap-modal" padding="20px">
          {
            props.type == "eth2bsc" ? (
              <label>Swap from ETH To BSC</label>
            ) : ( <label>Swap from BSC TO ETH</label> )
          }
        </Box>
      </Fade>
    </Modal>
  );
};

export default SwapModal;