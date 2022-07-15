import { useWeb3Context } from "../../hooks/web3Context";

const ConnectWalletButton = () => {  
  const { connect, disconnect, address } = useWeb3Context();
  return (
    <div>
      {
        address == '' ? (
          <button className="rounded-md bg-gradient-to-r from-paarl to-corvette w-155 h-40 text-white font-semibold m-5 b-1" onClick={connect}>
            Connect
          </button> ) :
          (
            <button className="rounded-md bg-gradient-to-r from-paarl to-corvette w-155 h-40 text-white font-semibold m-5 b-1" onClick={disconnect}>
            Disconnect
            </button>
          )
      }
    </div>
  );
}

export default ConnectWalletButton;
