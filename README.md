# [DEPRACTED] As of August 5th, rbxscan.js will be depracated due to a roblox API change relating to asset ID creation.

> Non-sequential IDs apply only to newly created assets.
> Universe IDs won’t be impacted, as it is not considered an asset.
> There will be no collisions between existing and new Asset IDs.
> The number of digits in the Asset ID will expand from 11 to 14 or more.

### You can read more [here](https://devforum.roblox.com/t/non-sequential-asset-id-generation-coming-soon/3082004/1).

# What Is rbxscan.js

rbxscan.js allows you to easily scan roblox assets using proxies

# How Do I Install It?

Run "npm install rbxscan.js"

# Usage

```ts
import { Scanner, Events, Asset } from "rbxscan.js"; // or using the require() funciton

const scanner = new Scanner({
  assetsPerScan: 550, // The amount of assets to scan
  retryOnError: true, // Rescan an asset (max of 2 rescans, 3 scans total if it still errors) if the request gets errored/ratelimited
  abortSignalTimeout: 5000, // The time to abort a request
  timeout: 500, // the speed in ms between each scan (optinal)
  startId: 34324243242, // The starting asset id of the scanner
  proxies: [
    {
      protocol: "http",
      port: 33,
      host: "34.234234.234",
      username: "axxx",
      password: "xxxx",
    },
  ], // The proxys
  cookies: [
    ".ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|",
  ],
});

scanner.on(Events.Scan, (asset: Asset) => {
  console.log(asset.id);
});

scanner.on(Events.Error, (error: Error) => {
  // Makes all errors except unauthorized not throw an exeption
  console.log(error.message);
});
```
