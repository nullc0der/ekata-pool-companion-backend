export interface IPool {
  poolName: string;
  region: string;
  urls: string[];
  ports: number[];
}

export interface ICoinData {
  coinName: string;
  coinLogoUrl: string;
  coinAlgo: string;
  cpuMineable: boolean;
  supportedMiningEngines: string[];
  pools: IPool[];
}
