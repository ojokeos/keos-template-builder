/**
 * Truncate string to maxLen, adding ellipsis if truncated.
 * Approximate emoji as 2 chars for width (single codepoint ~1, but many emoji are 2).
 */
export function truncateWithEllipsis(str, maxLen) {
    if (str.length <= maxLen)
        return { text: str, truncated: false };
    return { text: str.slice(0, Math.max(0, maxLen - 3)) + '...', truncated: true };
}
/**
 * Simple line wrap: break into lines of at most maxChars (no mid-word break in this baseline).
 */
export function wrapLines(str, maxChars) {
    const lines = [];
    let remaining = str;
    while (remaining.length > 0) {
        if (remaining.length <= maxChars) {
            lines.push(remaining);
            break;
        }
        const chunk = remaining.slice(0, maxChars);
        const lastSpace = chunk.lastIndexOf(' ');
        const breakAt = lastSpace > 0 ? lastSpace + 1 : maxChars;
        lines.push(remaining.slice(0, breakAt).trim());
        remaining = remaining.slice(breakAt).trim();
    }
    return lines;
}
//# sourceMappingURL=utils.js.map