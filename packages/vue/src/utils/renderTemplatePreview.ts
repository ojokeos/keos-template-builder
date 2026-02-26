/**
 * Replaces {{ variable }} placeholders in a string with values from the given profile.
 * Used for preview only; does not modify stored templates.
 */
export function renderTemplatePreview(
  text: string,
  profile: Record<string, string>
): string {
  if (!text || typeof text !== 'string') return text;
  return text.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (_, key) => {
    const k = key.trim();
    return k in profile ? String(profile[k]) : `{{ ${key} }}`;
  });
}

export interface SampleProfile {
  id: string;
  label: string;
  data: Record<string, string>;
}

/** Default sample profiles for "Preview as" when no external data is provided */
export const DEFAULT_SAMPLE_PROFILES: SampleProfile[] = [
  { id: 'alex', label: 'Alex (retail)', data: { first_name: 'Alex', order_id: 'ORD-001', city: 'Berlin', last_name: 'Müller' } },
  { id: 'sam', label: 'Sam (support)', data: { first_name: 'Sam', order_id: 'ORD-782', city: 'London', last_name: 'Jones' } },
  { id: 'jordan', label: 'Jordan (promo)', data: { first_name: 'Jordan', order_id: 'ORD-1024', city: 'Paris', last_name: 'Lee' } },
];
