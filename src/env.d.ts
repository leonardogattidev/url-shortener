/// <reference path="../.astro/types.d.ts" />

import type { Runtime } from "@astrojs/cloudflare";
import type { KVNamespace } from "@cloudflare/workers-types";

declare namespace App {
  interface Locals extends Runtime<Env> {}
}

interface Env {
  urls: KVNamespace;
}
