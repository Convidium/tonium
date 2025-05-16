export function normalizeEntity<T extends object>(
  raw: Partial<T>,
  defaults: Partial<T>
): T {
  return {
    ...defaults,
    ...raw,
  } as T;
}