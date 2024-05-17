import Proxy from "./proxy";

type Config = {
  assetsPerScan: number;
  startId: number;
  proxies: Proxy[];
  cookies: string[];
  abortSignalTimeout?: number;
  retryOnRatelimit?: boolean;
  timeout?: number;
};

export default Config;
