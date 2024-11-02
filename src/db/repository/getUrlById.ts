import { ApiError } from "../../lib/ApiError";
import type { KVNamespace } from "@cloudflare/workers-types";

export default async function getUrlById(
  urls: KVNamespace,
  id: string,
): Promise<string | ApiError> {
  // TODO: add exception handling
  const url = await urls.get(`s:${id}`);

  if (!url) return new ApiError(404, "URL not found");
  return url;
}
