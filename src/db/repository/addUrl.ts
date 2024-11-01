import type { KVNamespace } from "@cloudflare/workers-types";
import { ApiError } from "../../lib/ApiError";

export default async function addUrl(
  urls: KVNamespace,
  url: string,
): Promise<string | ApiError> {
  try {
    const urlKey = `l:${url}`;
    const existant = await urls.get(urlKey);

    if (existant) return existant;

    const id = (await urls.get("next_id")) || "0";
    await urls.put(urlKey, id);
    const idKey = `s:${id}`;
    await urls.put(idKey, url);

    await urls.put("next_id", String(parseInt(id) + 1));

    return id;
  } catch (error) {
    console.error(error);
    return ApiError.internal();
  }
}
