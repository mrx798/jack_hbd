/**
 * Prepend the Vite base URL to a public asset path.
 * In dev this is just "/", in production it becomes "/jack_hbd/".
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  // If path already starts with base, return as-is
  if (path.startsWith(base)) return path;
  // Strip leading slash from path so we don't double-slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
