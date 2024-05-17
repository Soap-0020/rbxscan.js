import { Events, Scanner } from "..";
import getAssets from "./getAssets";

const startScanning = async (scanner: Scanner): Promise<void> => {
  while (true) {
    const assets = await getAssets(
      scanner,
      new Array(scanner.assetsPerScan)
        .fill("")
        .map((_, index) => scanner.currentAssetId + index + 1)
    );

    scanner.currentAssetId =
      assets.sort((a, b) => b.id - a.id)[0]?.id ?? scanner.currentAssetId;

    assets
      .reverse()
      .forEach((asset) => scanner.listener.emit(Events.Scan, asset));

    await new Promise((e) => setTimeout(e, scanner.timeout));
  }
};

export default startScanning;
