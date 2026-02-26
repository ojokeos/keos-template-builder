import type { DeliverySummary } from '@keos/notification-builder-core';
import { spacing, radius, colors } from '@keos/notification-builder-ui-tokens';

export function DeliverySummaryCard({ summary }: { summary: DeliverySummary }) {
  return (
    <div
      style={{
        padding: `${spacing[16]}px`,
        borderRadius: `${radius.card}px`,
        background: colors.neutral.bgCard,
        border: `1px solid ${colors.neutral.border}`,
        marginTop: `${spacing[16]}px`,
      }}
    >
      <h4 style={{ fontSize: '0.875rem', fontWeight: 600, margin: `0 0 ${spacing[8]}px 0` }}>
        Delivery summary
      </h4>
      <dl style={{ margin: 0, fontSize: '0.8125rem', color: colors.neutral.textMeta }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
          <dt style={{ margin: 0, color: colors.neutral.textMuted }}>Send time</dt>
          <dd style={{ margin: 0 }}>{summary.sendTime}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
          <dt style={{ margin: 0, color: colors.neutral.textMuted }}>Audience</dt>
          <dd style={{ margin: 0 }}>{summary.audienceType}</dd>
        </div>
        {summary.estimatedReach !== undefined && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
            <dt style={{ margin: 0, color: colors.neutral.textMuted }}>Estimated reach</dt>
            <dd style={{ margin: 0 }}>{summary.estimatedReach.toLocaleString()}</dd>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
          <dt style={{ margin: 0, color: colors.neutral.textMuted }}>Platforms</dt>
          <dd style={{ margin: 0 }}>{summary.platforms.join(', ')}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
          <dt style={{ margin: 0, color: colors.neutral.textMuted }}>Priority</dt>
          <dd style={{ margin: 0 }}>{summary.priority}</dd>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, padding: '4px 0' }}>
          <dt style={{ margin: 0, color: colors.neutral.textMuted }}>TTL</dt>
          <dd style={{ margin: 0 }}>{summary.ttlLabel}</dd>
        </div>
      </dl>
    </div>
  );
}
