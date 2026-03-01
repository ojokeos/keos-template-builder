/** Location shown in notification preview (e.g. map strip). */
export interface PreviewLocation {
    lat?: number | null;
    lon?: number | null;
    name?: string | null;
    address?: string | null;
}
export interface PreviewResult {
    title: string;
    body: string;
    imageUrl?: string;
    titleTruncated: boolean;
    bodyTruncated: boolean;
    /** Optional: expanded vs collapsed (Android) */
    expanded?: boolean;
    /** Optional: dark mode for rendering */
    darkMode?: boolean;
    /** Optional: action buttons (platform-dependent display) */
    actions?: Array<{
        id: string;
        label?: string;
    }>;
    /** Optional: location for map/link in preview (Android: expanded map; iOS/Web: inline map) */
    location?: PreviewLocation | null;
}
export interface PreviewInput {
    title: string;
    body: string;
    imageUrl?: string;
    /** Optional locale for localized preview */
    locale?: string;
    /** Optional location (passed through to result for UI preview) */
    location?: PreviewLocation | null;
}
//# sourceMappingURL=types.d.ts.map