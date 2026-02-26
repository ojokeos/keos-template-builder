import type { CampaignTracking } from '@keos/notification-builder-core';
import { styles } from '../styles';

export function SectionTracking({
  tracking,
  onUpdate,
}: {
  tracking: CampaignTracking;
  onUpdate: (partial: Partial<CampaignTracking>) => void;
}) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Tracking & analytics</h3>
      <p style={styles.sectionDesc}>Campaign name is required for reporting</p>

      <div style={styles.field}>
        <label style={styles.label}>Campaign name</label>
        <input
          type="text"
          style={styles.input}
          placeholder="e.g. Spring Sale Promo"
          value={tracking.campaign_name}
          onChange={(e) => onUpdate({ campaign_name: e.target.value })}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Tags</label>
        <input
          type="text"
          style={styles.input}
          placeholder="sale, promo, march"
          value={tracking.tags?.join(', ') ?? ''}
          onChange={(e) =>
            onUpdate({
              tags: e.target.value
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <div style={styles.field}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={tracking.ab_test ?? false}
            onChange={() => onUpdate({ ab_test: !tracking.ab_test })}
          />
          <span>A/B test</span>
        </label>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Conversion event</label>
        <input
          type="text"
          style={styles.input}
          placeholder="e.g. purchase_completed"
          value={tracking.conversion_event ?? ''}
          onChange={(e) => onUpdate({ conversion_event: e.target.value || undefined })}
        />
      </div>
    </section>
  );
}
