/**
 * Replaces Go-template placeholders (for example {{ .first_name }})
 * with values from the given profile.
 * Used for preview only; does not modify stored templates.
 */
export declare function renderTemplatePreview(text: string, profile: Record<string, string>): string;
export interface SampleProfile {
    id: string;
    label: string;
    data: Record<string, string>;
}
/** Default sample profiles for "Preview as" when no external data is provided */
export declare const DEFAULT_SAMPLE_PROFILES: SampleProfile[];
//# sourceMappingURL=renderTemplatePreview.d.ts.map