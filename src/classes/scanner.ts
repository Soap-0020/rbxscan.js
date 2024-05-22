import { EventEmitter } from "events";
import startScanning from "../functions/startScanning";
import Proxy from "../types/proxy";
import Config from "../types/config";
import Events from "./events";

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
  retryOnError: boolean;
  abortSignalTimeout: number;
  on: (event: string, callback: (...params: any[]) => any) => any;

  constructor(config: Config) {
    this.proxies = config.proxies;
    this.cookies = config.cookies;
    this.startId = config.startId;
    this.assetsPerScan = config.assetsPerScan;
    this.timeout = config.timeout ?? 1000;
    this.abortSignalTimeout = config.abortSignalTimeout ?? 5000;
    this.currentAssetId = config.startId;

    this.lastUsedProxyIndex = null;
    this.lastUsedCookieIndex = null;
    this.throwUnexpectedErrors = true;
    this.retryOnError = config.retryOnError ?? false;

    this.listener = new EventEmitter();
    this.on = (event, callback) => {
      if (event == Events.Error) this.throwUnexpectedErrors = false;
      this.listener.on(event, callback);
    };

    if (this.cookies.length == 0 || this.proxies.length == 0)
      throw new Error("You need at least 1 cookie and proxy");

    startScanning(this);
  }
}

export default Scanner;
