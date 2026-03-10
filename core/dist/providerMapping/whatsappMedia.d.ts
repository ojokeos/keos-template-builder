/**
 * Gupshup media upload utility.
 *
 * WhatsApp template approval (via Gupshup / Meta) requires a Media Handle ID
 * for rich-media template headers. You cannot supply a raw public URL in the
 * exampleMedia field — the file must first be uploaded to obtain a handle.
 *
 * Usage:
 *   const { mediaId } = await uploadGupshupMedia(file, { apiKey, appId });
 *   // then set media_handle = mediaId in your template state
 */
export interface GupshupMediaConfig {
    /** Your Gupshup partner API key. */
    apiKey: string;
    /** The Gupshup App ID (visible in your partner dashboard). */
    appId: string;
    /**
     * Override the Gupshup API base URL.
     * Defaults to 'https://api.gupshup.io'.
     */
    baseUrl?: string;
}
export interface GupshupMediaUploadResult {
    /** The Media Handle ID to use in the template exampleMedia / header_handle field. */
    mediaId: string;
}
/**
 * Uploads a sample media file to Gupshup and returns the Media Handle ID
 * required for WhatsApp template approval with image/video/document headers.
 *
 * @param file   - The file to upload (image, video, or PDF).
 * @param config - Gupshup credentials and optional base URL override.
 */
export declare function uploadGupshupMedia(file: File, config: GupshupMediaConfig): Promise<GupshupMediaUploadResult>;
//# sourceMappingURL=whatsappMedia.d.ts.map