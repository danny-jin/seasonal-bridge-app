import Web3 from 'web3';
import { SeasonalToken } from "../interfaces/base";

import springImg from "../../assets/images/tokens/spring.png";
import summerImg from "../../assets/images/tokens/summer.png";
import autumnImg from "../../assets/images/tokens/autumn.png";
import winterImg from "../../assets/images/tokens/winter.png";


const springABI = require('../../abi/springABI.json');
const summerABI = require('../../abi/summerABI.json');
const autumnABI = require('../../abi/autumnABI.json');
const winterABI = require('../../abi/winterABI.json');
const ethBridgeABI = require('../../abi/ethBridgeABI.json');
const bscBridgeABI = require('../../abi/bscBridgeABI.json');

const etherProvider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/8cabb9938294442cb313eaa69e9ba8cf");
export const etherWeb3 = new Web3(Web3.givenProvider);
// export const etherWeb3 = new Web3(etherProvider);

const etherSpringAddr = '0xaa3648E6533028F422dc514b5EDe8Fb9171Bf8f2';
const etherSummerAddr = '0x37eeB07454332dC47cEE7D91e9DcB51D19317806';
const etherAutumnAddr = '0x18349631F5F39CdbcEd344a1EB8cE20A1C884EBB';
const etherWinterAddr = '0x40e076f7E6757e8bdb6BdF4d8512404A56039a64';
export const etherBridgeAddr = '0xEf3B7C80d2aAaC5Ed2689Bd0D35A5e69b93D4b9E';
const ethSpring = new etherWeb3.eth.Contract(springABI, etherSpringAddr);
const ethSummer = new etherWeb3.eth.Contract(summerABI, etherSummerAddr);
const ethAutumn = new etherWeb3.eth.Contract(autumnABI, etherAutumnAddr);
const ethWinter = new etherWeb3.eth.Contract(winterABI, etherWinterAddr);
export const ethBridge = new etherWeb3.eth.Contract(ethBridgeABI, etherBridgeAddr);
export const EthSeasonalContracts = [ethSpring, ethSummer, ethAutumn, ethWinter];
// export const EthSeasonalAddress = [etherSpringAddr, etherSummerAddr, etherAutumnAddr, etherWinterAddr];

const bscProvider = new Web3.providers.WebsocketProvider("wss://data-seed-prebsc-1-s2.binance.org:8545/ws");
export const bscWeb3 = new Web3(bscProvider);

const bscSpringAddr = '0xe9ec6407f99b54b29D43B74ed286503c9Effd60F';
const bscSummerAddr = '0x02DF25f221C38987A628fc9F3F8059c0C5B204E0';
const bscAutumnAddr = '0xfACb7C553468AFDAA2000B237688d3271E538725';
const bscWinterAddr = '0x4D44480F157DE93027E8c7dC26836aFeeEDDC946';
const bscBridgeAddr = '';
const bscSpring = new bscWeb3.eth.Contract(springABI, bscSpringAddr);
const bscSummer = new bscWeb3.eth.Contract(summerABI, bscSummerAddr);
const bscAutumn = new bscWeb3.eth.Contract(autumnABI, bscAutumnAddr);
const bscWinter = new bscWeb3.eth.Contract(winterABI, bscWinterAddr);
export const bscBridge = new bscWeb3.eth.Contract(bscBridgeABI, bscBridgeAddr);
export const BscSeasonalContracts = [bscSpring, bscSummer, bscAutumn, bscWinter];

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
