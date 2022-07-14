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

const etherProvider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/8cabb9938294442cb313eaa69e9ba8cf");
export const etherWeb3 = new Web3(etherProvider);

const etherSpringAddr = '0xaa3648E6533028F422dc514b5EDe8Fb9171Bf8f2';
const etherSummerAddr = '0x37eeB07454332dC47cEE7D91e9DcB51D19317806';
const etherAutumnAddr = '0x18349631F5F39CdbcEd344a1EB8cE20A1C884EBB';
const etherWinterAddr = '0x40e076f7E6757e8bdb6BdF4d8512404A56039a64';
const ethSpring = new etherWeb3.eth.Contract(springABI, etherSpringAddr);
const ethSummer = new etherWeb3.eth.Contract(summerABI, etherSummerAddr);
const ethAutumn = new etherWeb3.eth.Contract(autumnABI, etherAutumnAddr);
const ethWinter = new etherWeb3.eth.Contract(winterABI, etherWinterAddr);
export const EthSeasonalContracts = [ethSpring, ethSummer, ethAutumn, ethWinter];

const BscSeasonalAddress = [];

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
