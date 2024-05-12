import Proxy from "./proxy";

type Config = {
  assetsPerScan: number;
  startId: number;
  proxies: Proxy[];
  cookies: string[];

  timeout?: number;
};

export default Config;
