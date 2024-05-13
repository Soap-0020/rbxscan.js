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
  timeout: number;
  throwUnexpectedErrors: boolean;
  onScan: (callback: (asset: Asset) => any) => void;
  onError: (callback: (error: Error) => any) => void;

  constructor(config: Config) {
    this.proxies = config.proxies;
    this.cookies = config.cookies;
    this.startId = config.startId;
    this.assetsPerScan = config.assetsPerScan;
    this.timeout = config.timeout ?? 1000;
    this.currentAssetId = config.startId;

    this.lastUsedProxyIndex = null;
    this.lastUsedCookieIndex = null;
    this.throwUnexpectedErrors = true;

    this.listener = new EventEmitter();
    this.onScan = (callback) => this.listener.on("scan", callback);
    this.onError = (callback) => {
      this.throwUnexpectedErrors = false;
      this.listener.on("error", callback);
    };

    if (this.cookies.length == 0 || this.proxies.length == 0)
      throw new Error("You need at least 1 cookie and proxy");

    startScanning(this);
  }
}

export { Scanner };
