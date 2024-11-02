import type { APIRoute } from "astro";
import addUrl from "../../db/repository/addUrl";
import { encode } from "../../lib/base62";
import { ApiError } from "../../lib/ApiError";
import type { Env } from "../../env";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime.env as Env;

  const url = await parseURL(request);
  if (url instanceof ApiError) return url.response();

  const urls = env.urls;
  const id = await addUrl(urls, url);
  if (id instanceof ApiError) return id.response();

  const encodedId = encode(parseInt(id));
  const shortUrl = new URL(request.url);
  shortUrl.pathname = `/r/${encodedId}`;

  return Response.json({ shortUrl });
};

// TODO: Consider moving this to /lib
async function parseURL(request: Request): Promise<string | ApiError> {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType) return new ApiError(400, "Missing Content-Type header");

    let unparsedURL;

    if (contentType?.includes("application/json")) {
      unparsedURL = await request
        .json()
        .then((v: any) => v.url)
        .catch(() => new ApiError(400, "Invalid or missing JSON body"));
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const result = await request
        .formData()
        .then((v) => v.get("url"))
        .catch(() => new ApiError(400, "Invalid or missing form data"));
      unparsedURL = result;
    }

    if (unparsedURL instanceof ApiError) return unparsedURL;

    if (!unparsedURL || typeof unparsedURL != "string")
      return new ApiError(400, "Missing URL string");

    return new URL(unparsedURL).href;
  } catch (error) {
    return new ApiError(400, "Invalid URL, format, or Content-Type");
  }
}
