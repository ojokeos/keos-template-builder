import { PLATFORM_LIMITS } from '../constants.js';
import { truncateWithEllipsis } from './utils.js';
const limits = PLATFORM_LIMITS.ios;
/**
 * iOS banner: short title, ~2 lines body.
 */
export function simulateIOSBanner(input) {
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
export function simulateIOSLockscreen(input) {
    return simulateIOSBanner(input);
}
export function simulateIOS(input, options = {}) {
    const result = options.variant === 'lockscreen'
        ? simulateIOSLockscreen(input)
        : simulateIOSBanner(input);
    if (options.darkMode !== undefined)
        result.darkMode = options.darkMode;
    return result;
}
//# sourceMappingURL=simulateIOS.js.map