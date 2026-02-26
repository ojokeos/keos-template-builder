import type { CampaignMessage } from '@keos/notification-builder-core';
import type { Platform } from '@keos/notification-builder-core';
import { styles } from '../styles';

export function SectionMessage({
  message,
  titleCount,
  bodyCount,
  titleLimit,
  bodyLimit,
  onUpdate,
}: {
  message: CampaignMessage;
  titleCount: number;
  bodyCount: number;
  titleLimit: number;
  bodyLimit: number;
  selectedPlatform: Platform;
  onUpdate: (partial: Partial<CampaignMessage>) => void;
}) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Message content</h3>
      <p style={styles.sectionDesc}>What users see</p>

      <div style={styles.field}>
        <label style={styles.label}>
          Title
          <span style={{ ...styles.counter, ...(titleCount > titleLimit ? styles.counterWarn : {}) }}>
            {titleCount}/{titleLimit}
          </span>
        </label>
        <input
          type="text"
          style={styles.input}
          placeholder="Notification title"
          value={message.title_template}
          onChange={(e) => onUpdate({ title_template: e.target.value })}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          Message
          <span style={{ ...styles.counter, ...(bodyCount > bodyLimit ? styles.counterWarn : {}) }}>
            {bodyCount}/{bodyLimit}
          </span>
        </label>
        <textarea
          style={styles.textarea}
          rows={3}
          placeholder="Notification body"
          value={message.body_template}
          onChange={(e) => onUpdate({ body_template: e.target.value })}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Media (image URL)</label>
        <input
          type="url"
          style={styles.input}
          placeholder="https://..."
          value={message.image_url ?? ''}
          onChange={(e) => onUpdate({ image_url: e.target.value || undefined })}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Deep link / Action URL</label>
        <input
          type="url"
          style={styles.input}
          placeholder="https:// or app://..."
          value={message.deep_link ?? ''}
          onChange={(e) => onUpdate({ deep_link: e.target.value || undefined })}
        />
      </div>
    </section>
  );
}
