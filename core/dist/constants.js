/**
 * Platform-specific push notification limits (characters).
 * Used for character counters and preview truncation.
 */
export const PLATFORM_LIMITS = {
    android: {
        title: 60,
        body: 240,
    },
    ios: {
        title: 50,
        body: 120,
    },
    web: {
        title: 60,
        body: 240,
    },
};
export const PLATFORMS = ['android', 'ios', 'web'];
export const DEFAULT_PRIORITY = 'normal';
export const PRIORITIES = ['low', 'normal', 'high'];
export const DEFAULT_TTL_SECONDS = 86400; // 24 hours
export const TTL_PRESETS = [3600, 7200, 86400, 172800]; // 1h, 2h, 24h, 48h
export const SCHEMA_VERSION = '1.0';
export const AUDIENCE_TYPES = ['topic', 'segment', 'user_list'];
//# sourceMappingURL=constants.js.map