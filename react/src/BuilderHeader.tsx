import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';

export function BuilderHeader({
  campaignName,
  status,
  dirty,
  saving,
  onCampaignNameChange,
}: {
  campaignName: string;
  status: string;
  dirty: boolean;
  saving?: boolean;
  onCampaignNameChange: (value: string) => void;
}) {
  return (
    <header
      style={{
        padding: `${spacing[16]}px 0`,
        borderBottom: `1px solid ${colors.neutral.border}`,
        marginBottom: `${spacing[16]}px`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <input
          type="text"
          value={campaignName}
          placeholder="Campaign name"
          onChange={(e) => onCampaignNameChange(e.target.value)}
          style={{
            flex: 1,
            minWidth: 120,
            border: 'none',
            background: 'transparent',
            fontSize: '1rem',
            fontWeight: 600,
            outline: 'none',
          }}
        />
        <span
          style={{
            padding: `${spacing[4]}px ${spacing[8]}px`,
            borderRadius: `${radius.input}px`,
            background: colors.neutral.bg,
            fontSize: '0.8125rem',
            color: colors.neutral.textMuted,
          }}
        >
          {status}
        </span>
      </div>
      {(dirty || saving) && (
        <div style={{ fontSize: '0.8125rem', color: colors.neutral.textMuted, marginTop: `${spacing[4]}px` }}>
          {saving ? 'Saving…' : 'Unsaved changes'}
        </div>
      )}
    </header>
  );
}
