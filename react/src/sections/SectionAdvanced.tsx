import { useState } from 'react';
import type { CampaignDelivery } from '@keos/notification-builder-core';
import { styles } from '../styles';

export function SectionAdvanced({
  delivery,
  onUpdate,
}: {
  delivery: CampaignDelivery;
  onUpdate: (partial: Partial<CampaignDelivery>) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.accordion}>
      <div style={styles.accordionSummary} onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}>
        Advanced push behavior
      </div>
      {open && (
        <div style={styles.accordionBody}>
          <div style={styles.field}>
            <label style={styles.label}>Collapse key (replace previous notifications)</label>
            <input
              type="text"
              style={styles.input}
              placeholder="e.g. order_updates"
              value={delivery.collapse_key ?? ''}
              onChange={(e) => onUpdate({ collapse_key: e.target.value || undefined })}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.checkbox}>
              <input
                type="checkbox"
                checked={delivery.silent_push ?? false}
                onChange={() => onUpdate({ silent_push: !delivery.silent_push })}
              />
              <span>Silent push (background only)</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
