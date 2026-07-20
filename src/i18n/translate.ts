/**
 * Shared dictionary lookup helper used across pages/components.
 * Supports both call styles already in use: t(key, { fallback }) and t(key, fallback).
 */
export function createTranslator(dictionary: Record<string, unknown>) {
  return (key: string, fallbackOrOptions?: string | { fallback: string }): string => {
    const fallback = typeof fallbackOrOptions === 'string' ? fallbackOrOptions : fallbackOrOptions?.fallback;
    const parts = key.split('.');
    let current: unknown = dictionary;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return fallback ?? key;
      }
    }
    return typeof current === 'string' ? current : fallback ?? key;
  };
}
