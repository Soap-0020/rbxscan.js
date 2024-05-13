import { Scanner } from "..";
import Asset from "../types/asset";
import Proxy from "../types/proxy";
import fetch from "node-fetch";
import { HttpsProxyAgent } from "https-proxy-agent";
import getNextIndex from "./getNextIndex";

const fetchAssests = async (
  assets: number[],
  proxy: Proxy,
  cookie: string,
  scanner: Scanner
): Promise<Asset[]> => {
  const agent = new HttpsProxyAgent(
    `${proxy.protocol}://${proxy.username}:${proxy.password}@${proxy.host}:${proxy.port}`
  );

  let request;

  try {
    request = await fetch(
      `https://develop.roblox.com/v1/assets?assetIds=${assets.join(", ")}`,
      {
        headers: {
          Cookie: cookie,
        },
        agent,
      }
    );
  } catch (error: any) {
    if (scanner.throwUnexpectedErrors) throw new Error(error.message);
    scanner.listener.emit("error", error);
    return [];
  }

  if (request.status == 429)
    throw new Error("Rate limited, you may need more cookies or proxies");

  const json = await request.json();

  if (json?.errors) {
    if (json.errors[0].message == "Unauthorized") {
      throw new Error(`Invalid Cookie\n${cookie}`);
    } else {
      return [];
    }
  }

  return json.data;
};

const getAssets = async (
  scanner: Scanner,
  assets: number[]
): Promise<Asset[]> => {
  const pages = Math.ceil(assets.length / 50);
  const fetchPromises: Promise<Asset[]>[] = [];

  for (const page of new Array(pages).fill("").map((_, index) => index + 1)) {
    const proxyIndex = getNextIndex(
      scanner.proxies,
      scanner.lastUsedProxyIndex
    );
    scanner.lastUsedProxyIndex = proxyIndex;

    const cookieIndex = getNextIndex(
      scanner.cookies,
      scanner.lastUsedCookieIndex
    );
    scanner.lastUsedCookieIndex = cookieIndex;

    fetchPromises.push(
      fetchAssests(
        assets.slice((page - 1) * 50, page * 50),
        scanner.proxies[proxyIndex],
        scanner.cookies[cookieIndex],
        scanner
      )
    );
  }

  const results = await Promise.all(fetchPromises);

  return results.flatMap((e) => e);
};

export default getAssets;
