/** Length bucket for subject / preheader */
export type LengthBucket = 'too_short' | 'good' | 'too_long';

const SUBJECT_GOOD_MIN = 30;
const SUBJECT_GOOD_MAX = 60;
const PREVIEW_GOOD_MAX = 130;

export function subjectLengthBucket(subject: string): LengthBucket {
  const n = (subject ?? '').trim().length;
  if (n < SUBJECT_GOOD_MIN) return 'too_short';
  if (n <= SUBJECT_GOOD_MAX) return 'good';
  return 'too_long';
}

export function preheaderLengthBucket(preview: string): LengthBucket {
  const n = (preview ?? '').trim().length;
  if (n === 0) return 'too_short';
  if (n <= PREVIEW_GOOD_MAX) return 'good';
  return 'too_long';
}

const SPAMMY_PATTERNS = [
  /\bFREE!!!?\b/i,
  /\b100%\s*guaranteed\b/i,
  /\bact\s*now\b/i,
  /\bclick\s*here\b/i,
  /\blimited\s*time\b/i,
  /\bwinner\b/i,
  /\bcongratulations\b/i,
  /\burgent\b/i,
  /\brisk[- ]?free\b/i,
];

export function getSpammyWords(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const found: string[] = [];
  for (const re of SPAMMY_PATTERNS) {
    const m = text.match(re);
    if (m) found.push(m[0]);
  }
  return found;
}

export function getSubjectAnalyzerLabel(bucket: LengthBucket): string {
  switch (bucket) {
    case 'too_short':
      return 'Short';
    case 'good':
      return 'Good length';
    case 'too_long':
      return 'Long';
    default:
      return '';
  }
}

export function getPreviewAnalyzerLabel(bucket: LengthBucket): string {
  switch (bucket) {
    case 'too_short':
      return 'Add preheader';
    case 'good':
      return 'Good';
    case 'too_long':
      return 'Long';
    default:
      return '';
  }
}
