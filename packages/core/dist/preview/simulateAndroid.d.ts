import type { PreviewInput, PreviewResult } from './types.js';
/**
 * Android collapsed: single line title, 1-2 lines body.
 * Fidelity: match typical system behavior within limit chars.
 */
export declare function simulateAndroidCollapsed(input: PreviewInput): PreviewResult;
/**
 * Android expanded: full title/body up to platform limits.
 */
export declare function simulateAndroidExpanded(input: PreviewInput): PreviewResult;
export declare function simulateAndroid(input: PreviewInput, options?: {
    expanded?: boolean;
    darkMode?: boolean;
}): PreviewResult;
//# sourceMappingURL=simulateAndroid.d.ts.map