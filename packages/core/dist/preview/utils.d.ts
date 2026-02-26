/**
 * Truncate string to maxLen, adding ellipsis if truncated.
 * Approximate emoji as 2 chars for width (single codepoint ~1, but many emoji are 2).
 */
export declare function truncateWithEllipsis(str: string, maxLen: number): {
    text: string;
    truncated: boolean;
};
/**
 * Simple line wrap: break into lines of at most maxChars (no mid-word break in this baseline).
 */
export declare function wrapLines(str: string, maxChars: number): string[];
//# sourceMappingURL=utils.d.ts.map