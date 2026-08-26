/** @type {import('next').NextConfig} */
// Two build targets from one config:
//   - VPS (default): output "standalone", served by `node server.js` in Docker.
//   - GitHub Pages (BUILD_TARGET=pages): fully static export. A GitHub Pages
//     project site is served under /<repo-name>/, so every asset and internal
//     link needs that prefix — Next adds it automatically to next/image and
//     next/link, but not to the plain <a href> tags this app uses for locale
//     navigation. Those go through lib/basePath.ts instead.
const isPagesBuild = process.env.BUILD_TARGET === "pages";
const basePath = isPagesBuild ? "/landing-alem-auto-hub" : "";

const nextConfig = {
  reactStrictMode: true,
  ...(isPagesBuild
    ? {
        output: "export",
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {
        // Container is `node server.js` — Next needs the standalone server
        // bundled with its traced dependencies.
        output: "standalone",
      }),
  images: {
    // The landing container has a 256 MB limit and the image optimizer
    // (sharp) spikes memory per request; screenshots are already sized
    // correctly, so serve them unoptimized. Static export requires this
    // unconditionally anyway — there's no image server to call.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    // Keeps the Tabler barrel import from pulling the whole icon set.
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default nextConfig;
