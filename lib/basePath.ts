// GitHub Pages serves this project under /landing-alem-auto-hub; the VPS
// serves it at the domain root. next/link and next/image add the base path
// automatically — this covers the plain <a href> tags used for locale-aware
// navigation, which Next does not touch.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
