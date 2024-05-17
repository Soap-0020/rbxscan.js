# What Is rbxscan.js

rbxscan.js allows you to easily scan roblox assets using proxies

# How Do I Install It?

Run "npm install rbxscan.js"

# Usage

```ts
import { Scanner, Events } from "rbxscan.js"; // or using the require() funciton

const scanner = new Scanner({
  assetsPerScan: 550, // The amount of assets to scan
  retryOnRatelimit: true, // Rescan an asset (max 3 times) if the requet gets ratelimited
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

scanner.on(Events.Scan, (asset) => {
  console.log(asset.id);
});

scanner.on(Events.Error, (error) => {
  // Makes all errors except unauthorized not throw an exeption
  console.log(error.message);
});
```
