import React from "react";

import FantomIcon from "./assets/images/networks/fantom_icon.svg";
import RinkebyIcon from "./assets/images/networks/rinkeby_icon.svg";
import { ReactComponent as MoonriverIcon } from "./assets/images/networks/moonriver_icon.svg";
import { ReactComponent as MoonbaseAlphaIcon } from "./assets/images/networks/moonbase_alpha_icon.svg";
import { ReactComponent as EthereumIcon } from "./assets/images/networks/ethereum_icon.svg";
import { ReactComponent as BscIcon } from "./assets/images/networks/bsc_icon.svg";
import { ReactComponent as AvalancheIcon } from "./assets/images/networks/avalanche_icon.svg";
import { ReactComponent as PolygonIcon } from "./assets/images/networks/polygon_icon.svg";
import { ReactComponent as HarmonyIcon } from "./assets/images/networks/harmony_icon.svg";
import { ReactComponent as ArbitrumIcon } from "./assets/images/networks/arbitrum_icon.svg";

// import { dark as darkTheme } from "./themes/dark.js";
// import { river as riverTheme } from "./themes/river.js";
// import { DebugHelper } from "../helpers/DebugHelper";

export type NetworkId = number;

export enum NetworkIds {
  Ethereum = 1,
  Rinkeby = 4,
  Bsc = 56,
  FantomOpera = 250,
  FantomTestnet = 4002,
  Moonriver = 1285,
  MoonbaseAlpha = 1287,
  Boba = 288,
  Avalanche = 43114,
  Polygon = 137,
  Harmony = 1666600000,
  Arbitrum = 42161,
}

// TODO once for a while update block times, use yesterday's value as today is not complete day
// https://ftmscan.com/chart/blocktime
// https://moonscan.io/chart/blocktime

interface INetwork {
  name: string,
  logo: any,
  theme: any,
  isEnabled: boolean,
  isTestNet: boolean,
  blocktime: number, // NOTE could get this from an outside source since it changes slightly over time
  epochBlock: number,
  epochInterval: number,
  blockCountdownUrl: (block: number) => string,
  getEtherscanUrl: (txnHash: string) => string,
  getPoolTogetherUrls: (contractAddress: string) => string[],
  poolGraphUrl: string,
  liquidityPoolReserveDecimals: {
    token0Decimals: number,
    token1Decimals: number,
  },
  addresses: { [key: string]: string }
}

interface INetworks {
  [key: string]: INetwork;
}

export const networks: INetworks = {

};

export const enabledNetworkIds: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled);
export const enabledNetworkIdsExceptDexOnly: NetworkId[] = Object.keys(networks).map(networkId => parseInt(networkId)).filter(networkId => networks[networkId].isEnabled && networkId !== NetworkIds.Bsc && networkId !== NetworkIds.Ethereum && networkId !== NetworkIds.Avalanche && networkId !== NetworkIds.Polygon && networkId !== NetworkIds.Harmony && networkId !== NetworkIds.Arbitrum);
export const enabledMainNetworkIds: NetworkId[] = enabledNetworkIds.filter(networkId => !networks[networkId].isTestNet);
