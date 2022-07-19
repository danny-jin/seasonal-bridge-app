import Web3 from 'web3';

import { SeasonalToken } from '../interfaces/base';
import { contractABIs, networks, NetworkIds} from '../../networks';
import { chains } from '../../providers';

import springImg from '../../assets/images/tokens/spring.png';
import summerImg from '../../assets/images/tokens/summer.png';
import autumnImg from '../../assets/images/tokens/autumn.png';
import winterImg from '../../assets/images/tokens/winter.png';

const ethWeb3 = new Web3(chains[NetworkIds.Rinkeby].rpcUrls[0]);

const bscWeb3 = new Web3(chains[NetworkIds.BscTestnet].rpcUrls[0]);

const bscSeasonalContracts = Object.keys(networks[NetworkIds.BscTestnet].addresses).reduce((prev:any, season: string)=>{
    prev[season] = new bscWeb3.eth.Contract(contractABIs[season], networks[NetworkIds.BscTestnet].addresses[season]);
    return prev;
}, {});

const ethSeasonalContracts = Object.keys(networks[NetworkIds.Rinkeby].addresses).reduce((prev:any, season: string)=>{
    prev[season] = new ethWeb3.eth.Contract(contractABIs[season], networks[NetworkIds.Rinkeby].addresses[season]);
    return prev;
}, {});

export {ethWeb3, bscWeb3};

export const getContract = (networkId:number, season: string) => {
    const connectWeb3 = new Web3(Web3.givenProvider);
    return new connectWeb3.eth.Contract(contractABIs[season], networks[networkId].addresses[season]);
};

export const SeasonalTokens: {[key: string]:SeasonalToken} = {
    SPRING : {
        name: 'SPRING',
        ethContract: ethSeasonalContracts.SPRING,
        bscContract: bscSeasonalContracts.SPRING,
        img: springImg,
    },
    SUMMER : {
        name: 'SUMMER',
        ethContract: ethSeasonalContracts.SUMMER,
        bscContract: bscSeasonalContracts.SUMMER,
        img: summerImg,
    },
    AUTUMN : {
        name: 'AUTUMN',
        ethContract: ethSeasonalContracts.AUTUMN,
        bscContract: bscSeasonalContracts.AUTUMN,
        img: autumnImg,
    },
    WINTER : {
        name: 'WINTER',
        ethContract: ethSeasonalContracts.WINTER,
        bscContract: bscSeasonalContracts.WINTER,
        img: winterImg,
    },
};

export const SwapTypes: {[key: string]:string} = {
    ETH_TO_BSC: 'eth-bsc',
    BSC_TO_ETH: 'bsc-eth',
    BIG_AMOUNT: 'big_amount',
}

export const serverSocketUrl = 'localhost:3000';