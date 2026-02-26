import { PLATFORM_LIMITS } from '../constants.js';
import type { PreviewInput, PreviewResult } from './types.js';
import { truncateWithEllipsis } from './utils.js';

const limits = PLATFORM_LIMITS.android;

/**
 * Android collapsed: single line title, 1-2 lines body.
 * Fidelity: match typical system behavior within limit chars.
 */
export function simulateAndroidCollapsed(input: PreviewInput): PreviewResult {
  const { title: t, body: b } = input;
  const titleResult = truncateWithEllipsis(t || '', limits.title);
  const bodyResult = truncateWithEllipsis(b || '', limits.body);
  return {
    title: titleResult.text,
    body: bodyResult.text,
    imageUrl: input.imageUrl,
    titleTruncated: titleResult.truncated,
    bodyTruncated: bodyResult.truncated,
    expanded: false,
  };
}

/**
 * Android expanded: full title/body up to platform limits.
 */
export function simulateAndroidExpanded(input: PreviewInput): PreviewResult {
  const { title: t, body: b } = input;
  const titleResult = truncateWithEllipsis(t || '', limits.title);
  const bodyResult = truncateWithEllipsis(b || '', limits.body);
  return {
    title: titleResult.text,
    body: bodyResult.text,
    imageUrl: input.imageUrl,
    titleTruncated: titleResult.truncated,
    bodyTruncated: bodyResult.truncated,
    expanded: true,
  };
}

export function simulateAndroid(
  input: PreviewInput,
  options: { expanded?: boolean; darkMode?: boolean } = {}
): PreviewResult {
  const result = options.expanded
    ? simulateAndroidExpanded(input)
    : simulateAndroidCollapsed(input);
  if (options.darkMode !== undefined) result.darkMode = options.darkMode;
  return result;
}
