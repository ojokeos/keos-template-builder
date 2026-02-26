import { useState } from 'react';
import type { CampaignMessage } from '@keos/notification-builder-core';
import { styles } from '../styles';

const DEFAULT_VARIABLES = ['first_name', 'last_name', 'order_id', 'city'];

export function SectionPersonalization({
  variableOptions,
  onInsertVariable,
}: {
  message: CampaignMessage;
  variableOptions?: string[];
  onInsertVariable?: (payload: { variable: string; field: 'title' | 'body' }) => void;
}) {
  const vars = variableOptions ?? DEFAULT_VARIABLES;
  const [selectedVariable, setSelectedVariable] = useState(vars[0] ?? 'first_name');
  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>Personalization (optional)</h3>
      <p style={styles.sectionDesc}>Use variables like &#123;&#123; first_name &#125;&#125;</p>

      {onInsertVariable && (
        <div style={styles.field}>
          <label style={styles.label}>Insert variable</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <select
              value={selectedVariable}
              onChange={(e) => setSelectedVariable(e.target.value)}
              style={{ padding: '0.35rem 0.5rem', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.875rem', minWidth: '8rem' }}
            >
              {vars.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onInsertVariable({ variable: selectedVariable, field: 'title' })}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}
            >
              Into title
            </button>
            <button
              type="button"
              onClick={() => onInsertVariable({ variable: selectedVariable, field: 'body' })}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8125rem', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer' }}
            >
              Into message
            </button>
          </div>
        </div>
      )}

      <div style={styles.field}>
        <label style={styles.label}>Available variables</label>
        <p style={styles.hint}>
          Insert in title or message: &#123;&#123; variable_name &#125;&#125;. Fallback can be set when sending.
        </p>
        <ul style={styles.variableList}>
          {vars.map((v) => (
            <li key={v}>
              <code style={styles.variableCode}>&#123;&#123; {v} &#125;&#125;</code>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
