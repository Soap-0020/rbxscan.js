import { EventEmitter } from "events";
import Asset from "./types/asset";
import startScanning from "./functions/startScanning";
import Proxy from "./types/proxy";
import Config from "./types/config";

class Scanner {
  listener: EventEmitter;
  proxies: Proxy[];
  cookies: string[];
  startId: number;
  assetsPerScan: number;
  currentAssetId: number;
  lastUsedProxyIndex: number | null;
  lastUsedCookieIndex: number | null;
  onScan: (callback: (asset: Asset) => any) => any;

  constructor(config: Config) {
    this.proxies = config.proxies;
    this.cookies = config.cookies;
    this.startId = config.startId;
    this.assetsPerScan = config.assetsPerScan;

    this.currentAssetId = config.startId;

    this.lastUsedProxyIndex = null;
    this.lastUsedCookieIndex = null;

    this.listener = new EventEmitter();
    this.onScan = (callback) => this.listener.on("scan", callback);
    if (this.cookies.length == 0 || this.proxies.length == 0)
      throw new Error("You need at least 1 cookie and proxy");

    startScanning(this);
  }
}

export { Scanner };
