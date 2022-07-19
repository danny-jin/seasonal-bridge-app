import { ConnectWalletButton } from './ConnectWalletButton';

export const Nav = () => {
  return (
    <div className="flex flex-between justify-between items-center w-full bg-black h-55 md:h-85 md:p-10">
      <label className="text-white text-35 font-bold">Seasonal Token Swap Between Eth and Bsc</label>
      <ConnectWalletButton/>
    </div>
  )
}
