import { PLATFORM_LIMITS } from '../constants.js';
import type { PreviewInput, PreviewResult } from './types.js';
import { truncateWithEllipsis } from './utils.js';

const limits = PLATFORM_LIMITS.ios;

/**
 * iOS banner: short title, ~2 lines body.
 */
export function simulateIOSBanner(input: PreviewInput): PreviewResult {
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
 * iOS lockscreen: same limits, often same as banner.
 */
export function simulateIOSLockscreen(input: PreviewInput): PreviewResult {
  return simulateIOSBanner(input);
}

export function simulateIOS(
  input: PreviewInput,
  options: { variant?: 'banner' | 'lockscreen'; darkMode?: boolean } = {}
): PreviewResult {
  const result =
    options.variant === 'lockscreen'
      ? simulateIOSLockscreen(input)
      : simulateIOSBanner(input);
  if (options.darkMode !== undefined) result.darkMode = options.darkMode;
  return result;
}
