import ConnectWalletButton from './ConnectWalletButton';

const Nav = () => {
  return (
    <div className="flex flex-row-reverse justify-between items-center w-full bg-black h-55 md:h-85 md:p-10">
      <ConnectWalletButton/>
    </div>
  )
}

export default Nav; 