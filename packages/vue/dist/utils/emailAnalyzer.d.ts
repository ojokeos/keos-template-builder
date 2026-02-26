/** Length bucket for subject / preheader */
export type LengthBucket = 'too_short' | 'good' | 'too_long';
export declare function subjectLengthBucket(subject: string): LengthBucket;
export declare function preheaderLengthBucket(preview: string): LengthBucket;
export declare function getSpammyWords(text: string): string[];
export declare function getSubjectAnalyzerLabel(bucket: LengthBucket): string;
export declare function getPreviewAnalyzerLabel(bucket: LengthBucket): string;
//# sourceMappingURL=emailAnalyzer.d.ts.map