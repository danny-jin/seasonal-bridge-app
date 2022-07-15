import Web3 from 'web3';
import { SeasonalToken } from "../interfaces/base";
import { contractABIs, networks, NetworkIds} from '../../networks';
import springImg from "../../assets/images/tokens/spring.png";
import summerImg from "../../assets/images/tokens/summer.png";
import autumnImg from "../../assets/images/tokens/autumn.png";
import winterImg from "../../assets/images/tokens/winter.png";


export const etherWeb3 = new Web3(Web3.givenProvider);
export const EthSeasonalContracts = Object.keys(networks[NetworkIds.Rinkeby].addresses).map((season)=>{
    return new etherWeb3.eth.Contract(contractABIs[season], networks[NetworkIds.Rinkeby].addresses[season]);
});

export const bscWeb3 = new Web3('https://thrumming-weathered-frost.bsc-testnet.discover.quiknode.pro/31130ceb74ac83c82dbb6e19416e11ca66633c3a/');
export const BscSeasonalContracts = Object.keys(networks[NetworkIds.BscTestnet].addresses).map((season)=>{
    return new bscWeb3.eth.Contract(contractABIs[season], networks[NetworkIds.BscTestnet].addresses[season]);
});

export const SeasonalTokens: SeasonalToken[] = [
    {
        name: 'Spring',
        ethAddress: '',
        bscAddress: '',
        img: springImg
    },
    {
        name: 'Summer',
        ethAddress: '',
        bscAddress: '',
        img: summerImg
    },
    {
        name: 'Autumn',
        ethAddress: '',
        bscAddress: '',
        img: autumnImg
    },
    {
        name: 'Winter',
        ethAddress: '',
        bscAddress: '',
        img: winterImg
    },
];
