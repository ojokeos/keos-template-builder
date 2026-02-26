import type { CampaignAudience } from '@keos/notification-builder-core';
import { AUDIENCE_TYPES, PLATFORMS } from '@keos/notification-builder-core';
import { styles } from '../styles';

export function SectionAudience({
  audience,
  estimatedReach,
  canUseTestMode = true,
  onUpdate,
}: {
  audience: CampaignAudience;
  estimatedReach?: number;
  canUseTestMode?: boolean;
  onUpdate: (partial: Partial<CampaignAudience>) => void;
}) {
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Audience</h3>
      <p style={styles.sectionDesc}>Who receives this push?</p>

      <div style={styles.field}>
        <label style={styles.label}>Delivery type</label>
        <div style={styles.radioGroup}>
          {AUDIENCE_TYPES.map((t) => (
            <label key={t} style={styles.radio}>
              <input
                type="radio"
                name="delivery-type"
                checked={audience.type === t}
                onChange={() => onUpdate({ type: t })}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      {audience.type === 'topic' && (
        <div style={styles.field}>
          <label style={styles.label}>Topic name</label>
          <input
            type="text"
            style={styles.input}
            placeholder="e.g. promo_users, sports_updates"
            value={audience.topic_name ?? ''}
            onChange={(e) => onUpdate({ topic_name: e.target.value })}
          />
        </div>
      )}

      {audience.type === 'segment' && (
        <div style={styles.field}>
          <label style={styles.label}>Segment query (JSON)</label>
          <textarea
            style={{ ...styles.input, ...styles.textarea }}
            rows={3}
            placeholder='{"property": "country", "op": "eq", "value": "US"}'
            value={audience.segment_query_json ?? ''}
            onChange={(e) => onUpdate({ segment_query_json: e.target.value })}
          />
        </div>
      )}

      {audience.type === 'user_list' && (
        <div style={styles.field}>
          <label style={styles.label}>User IDs or tokens (one per line)</label>
          <textarea
            style={{ ...styles.input, ...styles.textarea }}
            rows={3}
            placeholder="user_123&#10;user_456"
            value={audience.user_list?.join('\n') ?? ''}
            onChange={(e) =>
              onUpdate({
                user_list: e.target.value
                  .split('\n')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      )}

      <div style={styles.field}>
        <label style={styles.label}>Platforms</label>
        <div style={styles.checkboxGroup}>
          {PLATFORMS.map((p) => (
            <label key={p} style={styles.checkbox}>
              <input
                type="checkbox"
                checked={audience.platforms.includes(p)}
                onChange={() =>
                  onUpdate({
                    platforms: audience.platforms.includes(p)
                      ? audience.platforms.filter((x) => x !== p)
                      : [...audience.platforms, p],
                  })
                }
              />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </div>

      {canUseTestMode && (
        <div style={styles.field}>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={audience.test_mode ?? false}
              onChange={() => onUpdate({ test_mode: !audience.test_mode })}
            />
            <span>Send to test device / test group only</span>
          </label>
        </div>
      )}

      {estimatedReach !== undefined && (
        <div style={styles.reach}>Estimated reach: {estimatedReach.toLocaleString()}</div>
      )}
    </section>
  );
}
