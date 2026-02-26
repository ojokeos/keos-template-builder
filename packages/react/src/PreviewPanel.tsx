import { useState, useMemo } from 'react';
import type { PreviewResult } from '@keos/notification-builder-core';
import type { Platform } from '@keos/notification-builder-core';
import { styles } from './styles';

export function PreviewPanel({
  getPreview,
  selectedPlatform,
  onPlatformChange,
}: {
  getPreview: (platform: Platform, options?: { expanded?: boolean }) => PreviewResult;
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const preview = useMemo(
    () =>
      getPreview(selectedPlatform, {
        expanded: selectedPlatform === 'android' ? expanded : undefined,
      }),
    [getPreview, selectedPlatform, expanded]
  );

  const platforms: Platform[] = ['android', 'ios', 'web'];

  return (
    <div style={styles.preview}>
      <div style={styles.previewTabs}>
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            style={{
              ...styles.previewTab,
              ...(selectedPlatform === p ? styles.previewTabActive : {}),
            }}
            onClick={() => onPlatformChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
      {selectedPlatform === 'android' && (
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={styles.checkbox}>
            <input type="checkbox" checked={expanded} onChange={(e) => setExpanded(e.target.checked)} />
            <span>Expanded</span>
          </label>
        </div>
      )}
      <div style={styles.previewDevice}>
        <div style={{ fontSize: '0.875rem' }}>
          {preview.title && <div style={styles.previewTitle}>{preview.title}</div>}
          {preview.body && <div style={styles.previewBody}>{preview.body}</div>}
          {preview.imageUrl && (
            <div style={{ marginTop: '0.5rem' }}>
              <img src={preview.imageUrl} alt="" style={{ maxWidth: '100%', height: 'auto', borderRadius: 4 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
