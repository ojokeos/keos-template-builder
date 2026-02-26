/**
 * Platform-specific push notification limits (characters).
 * Used for character counters and preview truncation.
 */
export declare const PLATFORM_LIMITS: {
    readonly android: {
        readonly title: 60;
        readonly body: 240;
    };
    readonly ios: {
        readonly title: 50;
        readonly body: 120;
    };
    readonly web: {
        readonly title: 60;
        readonly body: 240;
    };
};
export type Platform = keyof typeof PLATFORM_LIMITS;
export declare const PLATFORMS: Platform[];
export declare const DEFAULT_PRIORITY: "normal";
export declare const PRIORITIES: readonly ["low", "normal", "high"];
export type Priority = (typeof PRIORITIES)[number];
export declare const DEFAULT_TTL_SECONDS = 86400;
export declare const TTL_PRESETS: readonly [3600, 7200, 86400, 172800];
export declare const SCHEMA_VERSION = "1.0";
export declare const AUDIENCE_TYPES: readonly ["topic", "segment", "user_list"];
export type AudienceType = (typeof AUDIENCE_TYPES)[number];
//# sourceMappingURL=constants.d.ts.map