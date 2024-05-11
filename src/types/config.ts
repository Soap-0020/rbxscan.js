import Proxy from "./proxy";

type Config = {
  assetsPerSecond: number;
  startId: number;
  proxies: Proxy[];
  cookies: string[];
};

export default Config;
