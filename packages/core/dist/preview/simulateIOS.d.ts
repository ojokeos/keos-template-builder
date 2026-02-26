import type { PreviewInput, PreviewResult } from './types.js';
/**
 * iOS banner: short title, ~2 lines body.
 */
export declare function simulateIOSBanner(input: PreviewInput): PreviewResult;
/**
 * iOS lockscreen: same limits, often same as banner.
 */
export declare function simulateIOSLockscreen(input: PreviewInput): PreviewResult;
export declare function simulateIOS(input: PreviewInput, options?: {
    variant?: 'banner' | 'lockscreen';
    darkMode?: boolean;
}): PreviewResult;
//# sourceMappingURL=simulateIOS.d.ts.map