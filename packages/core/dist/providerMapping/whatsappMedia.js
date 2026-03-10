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
/**
 * Uploads a sample media file to Gupshup and returns the Media Handle ID
 * required for WhatsApp template approval with image/video/document headers.
 *
 * @param file   - The file to upload (image, video, or PDF).
 * @param config - Gupshup credentials and optional base URL override.
 */
export async function uploadGupshupMedia(file, config) {
    const base = (config.baseUrl ?? 'https://api.gupshup.io').replace(/\/$/, '');
    const url = `${base}/wa/api/v1/partner/app/${encodeURIComponent(config.appId)}/upload/media`;
    const form = new FormData();
    form.append('file', file);
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: { apikey: config.apiKey },
            body: form,
        });
    }
    catch (err) {
        throw new Error(`Gupshup media upload network error: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (!response.ok) {
        const text = await response.text().catch(() => response.statusText);
        throw new Error(`Gupshup media upload failed (${response.status}): ${text}`);
    }
    let data;
    try {
        data = await response.json();
    }
    catch {
        throw new Error('Gupshup media upload returned non-JSON response');
    }
    // Gupshup returns the handle under different shapes depending on API version.
    const d = data;
    const msg = d?.message;
    const mediaId = msg?.mediaId ??
        msg?.media_id ??
        msg?.handleId ??
        d?.mediaId ??
        d?.handle;
    if (!mediaId) {
        throw new Error(`Gupshup media upload succeeded but returned no mediaId. Response: ${JSON.stringify(data)}`);
    }
    return { mediaId };
}
//# sourceMappingURL=whatsappMedia.js.map