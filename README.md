# What Is rbxscan.js

> rbxscan.js allows you to easily scan roblox assets using proxies

# Usage

```ts
import Scanner from "rbxscan.js"; // or using the require() funciton

const scanner = new Scanner({
  assetsPerSecond: 550,
  startId: 34324243242,
  proxies: [
    {
      protocol: "http",
      port: 33,
      host: "34.234234.234",
      username: "axxx",
      password: "xxxx",
    },
  ],
  cookies: [
    ".ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|",
  ],
});

scanner.onScan((asset) => {
  console.log(asset.id);
});
```