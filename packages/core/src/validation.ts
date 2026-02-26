import type { Campaign, CampaignAudience } from './types.js';
import { computeSendWarnings } from './deliverySummary.js';

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  message: string;
  severity: ValidationSeverity;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
}

function issue(message: string, severity: ValidationSeverity = 'error'): ValidationIssue {
  return { message, severity };
}

export function validateCampaign(campaign: Campaign): ValidationResult {
  const errors: ValidationIssue[] = [];

  if (!campaign.schema_version) {
    errors.push(issue('Missing schema_version'));
  }

  if (!campaign.message.title_template?.trim()) {
    errors.push(issue('Title is required'));
  }

  if (!campaign.message.body_template?.trim()) {
    errors.push(issue('Message body is required'));
  }

  if (campaign.audience.type === 'topic' && !campaign.audience.topic_name?.trim()) {
    errors.push(issue('Topic name is required when targeting by topic'));
  }

  if (campaign.audience.platforms.length === 0) {
    errors.push(issue('At least one platform (iOS, Android, Web) must be selected'));
  }

  if (campaign.tracking && !campaign.tracking.campaign_name?.trim()) {
    errors.push(issue('Campaign name is required for tracking'));
  }

  if (campaign.delivery.ttl_seconds <= 0) {
    errors.push(issue('TTL must be greater than 0'));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/** Returns validation result with optional warnings (from computeSendWarnings) merged in. */
export function validateCampaignWithWarnings(
  campaign: Campaign,
  estimatedReach?: number
): ValidationResult {
  const result = validateCampaign(campaign);
  const warnings = computeSendWarnings(campaign, estimatedReach);
  return {
    valid: result.valid,
    errors: [
      ...result.errors,
      ...warnings.map((w) => issue(w.message, w.severity)),
    ],
  };
}

export function validateAudience(audience: CampaignAudience): ValidationResult {
  const errors: ValidationIssue[] = [];

  if (audience.type === 'topic' && !audience.topic_name?.trim()) {
    errors.push(issue('Topic name is required'));
  }

  if (audience.platforms.length === 0) {
    errors.push(issue('Select at least one platform'));
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/** Helper: only issues that block send/schedule (severity === 'error'). */
export function getBlockingErrors(result: ValidationResult): ValidationIssue[] {
  return result.errors.filter((e) => e.severity === 'error');
}

/** Helper: non-blocking issues (warning, info). */
export function getWarnings(result: ValidationResult): ValidationIssue[] {
  return result.errors.filter((e) => e.severity !== 'error');
}
