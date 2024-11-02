# URL Shortener

## Tools

- [TypeScript](https://www.typescriptlang.org/)
- [Astro](https://astro.build/) - [Hybrid SSR](https://docs.astro.build/en/basics/rendering-modes/#on-demand-rendered) using its [Cloudflare integration](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Solid](https://www.solidjs.com/) - Simpler, lightweight and performant interactive components
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Cloudflare](https://www.cloudflare.com/developer-platform/products/) - For deployment
  - [Pages](https://pages.cloudflare.com/) - CDN served static assets
  - [Workers](https://workers.cloudflare.com/) - Edge, serverless functions
  - [Workers KV](https://www.cloudflare.com/developer-platform/products/workers-kv/) - Edge, serverless key-value store.

## To do / Ideas

- Workflow
  - CI/CD ([GitHub Actions](https://github.com/features/actions))
  - UI Component Testing ([Storybook](https://storybook.js.org/))
  - Consider E2E Testing ([Playwright](https://playwright.dev/))
  - Consider Mocking (e.g. DB interactions)
  - [x] `base62` testing
- Performance
  - Benchmark Go for Workers/Functions (WASM)
  - [x] Migrate to WorkersKV (Removed Turso and DrizzleORM code and dependencies)
- Check other URL Shortener services for ideas
