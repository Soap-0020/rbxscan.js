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
  assetsPerSecond: number;
  currentAssetId: number;
  onScan: (callback: (asset: Asset) => any) => any;

  constructor(config: Config) {
    this.proxies = config.proxies;
    this.cookies = config.cookies;
    this.startId = config.startId;
    this.assetsPerSecond = config.assetsPerSecond;

    this.currentAssetId = config.startId;

    this.listener = new EventEmitter();
    this.onScan = (callback) => this.listener.on("scan", callback);
    if (this.cookies.length == 0 || this.proxies.length == 0)
      throw new Error("You need at least 1 cookie and proxy");

    startScanning(this);
  }
}

export {Scanner};
