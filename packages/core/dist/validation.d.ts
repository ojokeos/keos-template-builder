import type { Campaign, CampaignAudience } from "./types.js";
export type ValidationSeverity = "error" | "warning" | "info";
export interface ValidationIssue {
    message: string;
    severity: ValidationSeverity;
}
export interface ValidationResult {
    valid: boolean;
    errors: ValidationIssue[];
}
/**
 * Core validation: builder-agnostic, only schema_version.
 * All other rules (name, message body/title/subject, audience, delivery, etc.)
 * are builder-specific and should be provided via hooks.customValidators.
 */
export declare function validateCampaign(campaign: Campaign): ValidationResult;
/** Returns validation result with optional warnings (from computeSendWarnings) merged in. */
export declare function validateCampaignWithWarnings(campaign: Campaign, estimatedReach?: number): ValidationResult;
export declare function validateAudience(audience: CampaignAudience): ValidationResult;
/** Helper: only issues that block send/schedule (severity === 'error'). */
export declare function getBlockingErrors(result: ValidationResult): ValidationIssue[];
/** Helper: non-blocking issues (warning, info). */
export declare function getWarnings(result: ValidationResult): ValidationIssue[];
//# sourceMappingURL=validation.d.ts.map