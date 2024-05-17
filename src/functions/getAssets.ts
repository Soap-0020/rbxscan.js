import { Scanner } from "..";
import Asset from "../types/asset";
import fetchAssests from "./fetchAssets";

const getAssets = async (
  scanner: Scanner,
  assets: number[]
): Promise<Asset[]> => {
  const pages = Math.ceil(assets.length / 50);
  const fetchPromises: Promise<Asset[]>[] = [];

  for (const page of new Array(pages).fill("").map((_, index) => index + 1)) {
    fetchPromises.push(
      fetchAssests(assets.slice((page - 1) * 50, page * 50), scanner, 0)
    );
  }

  const results = await Promise.all(fetchPromises);

  return results.flatMap((e) => e);
};

export default getAssets;
