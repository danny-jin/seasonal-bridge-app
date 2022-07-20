import { useWeb3Context } from '../../hooks/web3Context';

export const ConnectWalletButton = () => {
  const { connect, disconnect, address } = useWeb3Context();
  return (
    <div>
      {
        address === '' ? (
          <button className="uppercase bg-squash text-white text-1em rounded-7 shadow-skyblue px-[1.81em] py-[0.81em] font-medium" onClick={connect}>
            Connect wallet
          </button> ) :
          (
            <button className="uppercase bg-squash text-white text-1em rounded-7 shadow-skyblue px-[1.81em] py-[0.81em] font-medium" onClick={disconnect}>
            Disconnect
            </button>
          )
      }
    </div>
  );
}
