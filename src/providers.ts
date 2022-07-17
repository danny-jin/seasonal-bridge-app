import { Provider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { NetworkIds } from "./networks";
// import { NodeHelper } from "./helpers/NodeHelper";
// import { MulticallProvider } from "./lib/MulticallProvider";

interface ChainDetailsOpts {
  networkName: string,
  rpcUrls: string[],
  symbol: string,
  decimals: number,
  blockExplorerUrls: string[],
  multicallAddress?: string,
}

class ChainDetails {
  readonly networkName: string;
  readonly symbol: string;
  readonly decimals: number;
  readonly rpcUrls: string[];
  readonly blockExplorerUrls: string[];
  readonly multicallAddress?: string;
  readonly provider: Promise<Provider>;

  constructor(chainDetailsOpts: ChainDetailsOpts) {
    this.networkName = chainDetailsOpts.networkName;
    this.rpcUrls = chainDetailsOpts.rpcUrls;
    this.symbol = chainDetailsOpts.symbol;
    this.decimals = chainDetailsOpts.decimals;
    this.blockExplorerUrls = chainDetailsOpts.blockExplorerUrls;
    this.multicallAddress = chainDetailsOpts.multicallAddress;

    // Use the fastest node available
    this.provider = ChainDetails.getFastestRpcUrl(this.rpcUrls).then(rpcUrl => {
      const staticProvider = new StaticJsonRpcProvider(rpcUrl);
    //   if (this.multicallAddress) {
    //     return new MulticallProvider(this.networkName, staticProvider, this.multicallAddress);
    //   } else {
        return staticProvider;
    //   }
    });
  }

  // Return the fastest rpcUrl available
  private static async getFastestRpcUrl(rpcUrls: string[]): Promise<string> {
    return Promise.any(rpcUrls.map(rpcUrl => new Promise<string>((resolve, reject) => {
    //   NodeHelper.checkNodeStatus(rpcUrl).then(working => {
    //     if (working) {
    //       resolve(rpcUrl);
    //     } else {
    //       reject();
    //     }
    //   });
    })));
  }

}

interface AllChainDetails {
  [key: number]: ChainDetails
}

export const chains: AllChainDetails = {
  [NetworkIds.Ethereum]: new ChainDetails({
    networkName: 'Ethereum',
    rpcUrls: [
      'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    ],
    symbol: 'ETH',
    decimals: 18,
    blockExplorerUrls: ['https://etherscan.io/'],
    multicallAddress: '0xf0a4c5b65317ce6fed4e262e514dec83837d146a',
  }),
  [NetworkIds.Rinkeby]: new ChainDetails({
    networkName: 'Rinkeby',
    rpcUrls: [
      // 'https://rinkeby.infura.io/v3/1ff71c39bddd4d93971b23697b82bc0e',
      'https://eth-rinkeby.alchemyapi.io/v2/y1kcvsoSiVJTHDHfhIjt21dDrm-2vtPe'
    ],
    symbol: 'ETH',
    decimals: 18,
    blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
  }),
  [NetworkIds.Bsc]: new ChainDetails({
    networkName: 'Rinkeby',
    rpcUrls: [
      'https://thrumming-weathered-frost.bsc-testnet.discover.quiknode.pro/31130ceb74ac83c82dbb6e19416e11ca66633c3a/',
    ],
    symbol: 'BNB',
    decimals: 18,
    blockExplorerUrls: [],
  }),
  [NetworkIds.BscTestnet]: new ChainDetails({
    networkName: 'Rinkeby',
    rpcUrls: [
      'https://thrumming-weathered-frost.bsc-testnet.discover.quiknode.pro/31130ceb74ac83c82dbb6e19416e11ca66633c3a/',
    ],
    symbol: 'TBNB',
    decimals: 18,
    blockExplorerUrls: [],
  }),
};
