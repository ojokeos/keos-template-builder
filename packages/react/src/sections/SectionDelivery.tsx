import type { CampaignDelivery } from '@keos/notification-builder-core';
import { PRIORITIES, TTL_PRESETS } from '@keos/notification-builder-core';
import { styles } from '../styles';

const TTL_LABELS: Record<number, string> = {
  3600: '1 hour',
  7200: '2 hours',
  86400: '24 hours',
  172800: '48 hours',
};

export function SectionDelivery({
  delivery,
  onUpdate,
}: {
  delivery: CampaignDelivery;
  onUpdate: (partial: Partial<CampaignDelivery>) => void;
}) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Delivery controls</h3>
      <p style={styles.sectionDesc}>When and how it sends</p>

      <div style={styles.field}>
        <label style={styles.label}>Send</label>
        <div style={styles.radioGroup}>
          <label style={styles.radio}>
            <input
              type="radio"
              name="send-mode"
              checked={!delivery.scheduled_at}
              onChange={() => onUpdate({ scheduled_at: undefined })}
            />
            <span>Now</span>
          </label>
          <label style={styles.radio}>
            <input
              type="radio"
              name="send-mode"
              checked={!!delivery.scheduled_at}
              onChange={() => onUpdate({ scheduled_at: new Date().toISOString().slice(0, 16) })}
            />
            <span>Schedule</span>
          </label>
        </div>
      </div>

      {delivery.scheduled_at && (
        <div style={{ ...styles.field, display: 'flex', gap: '0.5rem' }}>
          <input
            type="datetime-local"
            style={{ ...styles.input, flex: 1 }}
            value={delivery.scheduled_at?.slice(0, 16) ?? ''}
            onChange={(e) => onUpdate({ scheduled_at: e.target.value })}
          />
          <input
            type="text"
            style={{ ...styles.input, flex: 1 }}
            placeholder="Timezone e.g. UTC"
            value={delivery.timezone ?? ''}
            onChange={(e) => onUpdate({ timezone: e.target.value })}
          />
        </div>
      )}

      <div style={styles.field}>
        <label style={styles.label}>Expiration (TTL)</label>
        <select
          style={styles.select}
          value={delivery.ttl_seconds}
          onChange={(e) => onUpdate({ ttl_seconds: Number(e.target.value) })}
        >
          {TTL_PRESETS.map((s) => (
            <option key={s} value={s}>
              {TTL_LABELS[s] ?? s + 's'}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>
          Priority
          <span title="High: wakes device immediately. Normal: batched. Low: may be delayed.">ⓘ</span>
        </label>
        <select
          style={styles.select}
          value={delivery.priority}
          onChange={(e) => onUpdate({ priority: e.target.value as CampaignDelivery['priority'] })}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={delivery.quiet_hours_respected ?? false}
            onChange={() => onUpdate({ quiet_hours_respected: !delivery.quiet_hours_respected })}
          />
          <span>Respect quiet hours</span>
        </label>
      </div>
    </section>
  );
}
