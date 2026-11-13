/**
 * Standardized Meta Description Length & Formatting Helpers
 */

export function truncateMetaDescription(desc: string, maxLen = 160): string {
  if (!desc) return '';
  const trimmed = desc.trim();
  if (trimmed.length <= maxLen) return trimmed;
  const cut = trimmed.slice(0, maxLen - 3);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 120 ? cut.slice(0, lastSpace) : cut) + '...';
}

export function validateMetaDescription(desc: string): { valid: boolean; length: number; warning?: string } {
  const len = (desc || '').trim().length;
  if (len < 110) {
    return { valid: false, length: len, warning: 'Description too short (ideal: 120-160 chars)' };
  }
  if (len > 165) {
    return { valid: false, length: len, warning: 'Description exceeds SERP snippet boundary (>160 chars)' };
  }
  return { valid: true, length: len };
}
