import { PLATFORM_LIMITS } from '../constants.js';
import { truncateWithEllipsis } from './utils.js';
const limits = PLATFORM_LIMITS.web;
/**
 * Web push toast-style preview.
 */
export function simulateWeb(input) {
    const { title: t, body: b } = input;
    const titleResult = truncateWithEllipsis(t || '', limits.title);
    const bodyResult = truncateWithEllipsis(b || '', limits.body);
    return {
        title: titleResult.text,
        body: bodyResult.text,
        imageUrl: input.imageUrl,
        titleTruncated: titleResult.truncated,
        bodyTruncated: bodyResult.truncated,
    };
}
//# sourceMappingURL=simulateWeb.js.map