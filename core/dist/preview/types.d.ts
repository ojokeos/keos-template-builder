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
}
export interface PreviewInput {
    title: string;
    body: string;
    imageUrl?: string;
    /** Optional locale for localized preview */
    locale?: string;
}
//# sourceMappingURL=types.d.ts.map