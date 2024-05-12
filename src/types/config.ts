import Proxy from "./proxy";

type Config = {
  assetsPerScan: number;
  startId: number;
  proxies: Proxy[];
  cookies: string[];
};

export default Config;
