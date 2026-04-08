// Keeps client-side full-page redirects and React Router basename aligned with Vite `base`.

const rawBase = import.meta.env.BASE_URL ?? '/';

/** Vite base URL (e.g. `/client/`). */
export const APP_BASE_URL = rawBase;

function normalizedBasePath(): string {
  if (!rawBase || rawBase === '/') return '';
  return rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;
}

/**
 * React Router `basename`: no trailing slash; omit when the app is served at site root.
 */
export function getRouterBasename(): string | undefined {
  const b = normalizedBasePath();
  return b || undefined;
}

/**
 * Path for `window.location` / `<a href>` that must include the Vite `base` prefix.
 * @param path - App route starting with `/`, e.g. `/login`
 */
export function resolveAppPath(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const base = normalizedBasePath();
  if (!base) return p;
  return `${base}${p}`;
}
