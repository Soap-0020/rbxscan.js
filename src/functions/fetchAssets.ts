import { HttpsProxyAgent } from "https-proxy-agent";
import Events from "../classes/events";
import getNextIndex from "./getNextIndex";
import Asset from "../types/asset";
import Scanner from "../classes/scanner";
import fetch from "node-fetch";

const fetchAssests = async (
  assets: number[],
  scanner: Scanner,
  retriedIndex: number
): Promise<Asset[]> => {
  const proxyIndex = getNextIndex(scanner.proxies, scanner.lastUsedProxyIndex);
  scanner.lastUsedProxyIndex = proxyIndex;
  const proxy = scanner.proxies[proxyIndex];

  const cookieIndex = getNextIndex(
    scanner.cookies,
    scanner.lastUsedCookieIndex
  );
  scanner.lastUsedCookieIndex = cookieIndex;
  const cookie = scanner.cookies[cookieIndex];

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
        signal: AbortSignal.timeout(scanner.abortSignalTimeout),
      }
    );
  } catch (error: any) {
    if (scanner.throwUnexpectedErrors) throw new Error(error.message);
    scanner.listener.emit(Events.Error, error);
    return [];
  }

  if (request.status == 429) {
    const error = new Error(
      "Rate limited, you may need more cookies or proxies"
    );

    if (!scanner.throwUnexpectedErrors)
      scanner.listener.emit(Events.Error, error);

    if (scanner.retryOnRatelimit && retriedIndex > 3) {
      await new Promise((e) => setTimeout(e, (retriedIndex + 1) * 1000));
      return await fetchAssests(assets, scanner, retriedIndex + 1);
    } else if (scanner.throwUnexpectedErrors) throw error;
  }

  let json;

  try {
    json = await request.json();
  } catch {
    const error = new Error("Request is not in JSON format");
    if (scanner.throwUnexpectedErrors) throw error;
    scanner.listener.emit(Events.Error, error);
    return [];
  }

  if (json?.errors) {
    if (json.errors[0].message == "Unauthorized") {
      throw new Error(`Invalid Cookie\n${cookie}`);
    } else {
      const error = new Error(json.errors[0].message);
      if (scanner.throwUnexpectedErrors) throw error;
      scanner.listener.emit(Events.Error, error);
      return [];
    }
  }

  return json.data;
};

export default fetchAssests;
