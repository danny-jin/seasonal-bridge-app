import { useWeb3Context } from "../../hooks/web3Context";
const ConnectWalletButton = () => {
  const { connect } = useWeb3Context();
  return (
    <button className="rounded-md bg-gradient-to-r from-paarl to-corvette w-155 h-40 text-white font-semibold m-5 b-1" onClick={connect}>
      Connect
    </button>
  );
}

export default ConnectWalletButton;
