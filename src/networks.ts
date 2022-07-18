import seasonalABI from './abi/seasonalABI.json';
import ethBridgeABI from './abi/ethBridgeABI.json';
import bscBridgeABI from './abi/bscBridgeABI.json';
export type NetworkId = number;

export enum NetworkIds {
  Ethereum = 1,
  Rinkeby = 4,
  Bsc = 56,
  BscTestnet = 97
}

interface INetwork {
  name: string,
  isEnabled: boolean,
  addresses: { [key: string]: string }
}

interface INetworks {
  [key: string]: INetwork;
}

export const networks: INetworks = {
  [NetworkIds.Rinkeby]: {
    name: 'Ethereum Rinkeby',
    isEnabled: true,
    addresses: {
      SPRING: '0xaa3648E6533028F422dc514b5EDe8Fb9171Bf8f2',
      SUMMER: '0x37eeB07454332dC47cEE7D91e9DcB51D19317806',
      AUTUMN: '0x18349631F5F39CdbcEd344a1EB8cE20A1C884EBB',
      WINTER: '0x40e076f7E6757e8bdb6BdF4d8512404A56039a64',
      ETH_BRIDGE: '0xEf3B7C80d2aAaC5Ed2689Bd0D35A5e69b93D4b9E'
    }
  },
  [NetworkIds.BscTestnet]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      SPRING: '0xe9ec6407f99b54b29D43B74ed286503c9Effd60F',
      SUMMER: '0x02DF25f221C38987A628fc9F3F8059c0C5B204E0',
      AUTUMN: '0xfACb7C553468AFDAA2000B237688d3271E538725',
      WINTER: '0x4D44480F157DE93027E8c7dC26836aFeeEDDC946',
      BSC_BRIDGE: '0x68C41083cE39b48Eb06a824A28336Cdb21A795DD'
    }
  },
  [NetworkIds.Ethereum]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      SPRING: '',
      SUMMER: '',
      AUTUMN: '',
      WINTER: '',
      ETH_BRIDGE: ''
    }
  },
  [NetworkIds.Bsc]: {
    name: 'BSC Testnet',
    isEnabled: true,
    addresses: {
      SPRING: '',
      SUMMER: '',
      AUTUMN: '',
      WINTER: '',
      BSC_BRIDGE: ''
    }
  }
};

interface SeasonalABIS {
  [key: string]: any;
};
export const contractABIs: SeasonalABIS = {
  SPRING: seasonalABI,
  SUMMER: seasonalABI,
  AUTUMN: seasonalABI,
  WINTER: seasonalABI,
  ETH_BRIDGE: ethBridgeABI,
  BSC_BRIDGE: bscBridgeABI
}

export const enabledNetworkIds: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled);
