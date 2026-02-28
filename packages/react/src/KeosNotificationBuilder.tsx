import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Campaign, BuilderExtensionHooks } from '@keos/notification-builder-core';
import { computeDeliverySummary } from '@keos/notification-builder-core';
import { spacing, colors, radius, elevation } from '@keos/notification-builder-ui-tokens';
import { useCampaignState } from './hooks/useCampaignState';
import { SectionCard } from './SectionCard';
import { BuilderHeader } from './BuilderHeader';
import { DeliverySummaryCard } from './DeliverySummaryCard';
import { SectionAudience } from './sections/SectionAudience';
import { SectionMessage } from './sections/SectionMessage';
import { SectionPersonalization } from './sections/SectionPersonalization';
import { SectionDelivery } from './sections/SectionDelivery';
import { SectionAdvanced } from './sections/SectionAdvanced';
import { SectionTracking } from './sections/SectionTracking';
import { PreviewPanel } from './PreviewPanel';

export interface KeosNotificationBuilderProps {
  campaign?: Partial<Campaign>;
  hooks?: BuilderExtensionHooks;
  disabledSections?: string[];
  variableOptions?: string[];
  onChange?: (campaign: Campaign) => void;
  onSave?: (campaign: Campaign) => void;
  onSendTest?: (campaign: Campaign) => void;
  onSchedule?: (campaign: Campaign) => void;
  onSend?: (campaign: Campaign) => void;
}

export function KeosNotificationBuilder({
  campaign: initialCampaign,
  hooks,
  disabledSections = [],
  variableOptions,
  onChange,
  onSave,
  onSendTest,
  onSchedule,
  onSend,
}: KeosNotificationBuilderProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios' | 'web'>('android');
  const [estimatedReach, setEstimatedReach] = useState<number | undefined>();
  const [canSend, setCanSend] = useState(true);
  const [canSchedule, setCanSchedule] = useState(true);

  const state = useCampaignState({
    initial: initialCampaign,
    hooks,
    onDirty: () => onChange?.(state.campaign),
  });

  const resolveHooks = useCallback(async () => {
    if (hooks?.estimateReach) {
      try {
        const reach = await hooks.estimateReach(state.campaign.audience);
        setEstimatedReach(reach);
      } catch {
        setEstimatedReach(undefined);
      }
    }
    if (hooks?.canSend) setCanSend(await Promise.resolve(hooks.canSend()));
    if (hooks?.canSchedule) setCanSchedule(await Promise.resolve(hooks.canSchedule()));
  }, [hooks, state.campaign.audience]);

  useEffect(() => {
    resolveHooks();
  }, [resolveHooks]);

  const validationFull = useMemo(
    () => state.getValidationWithWarnings(estimatedReach),
    [state.campaign, estimatedReach, state.getValidationWithWarnings]
  );
  const blockingErrors = validationFull.blockingErrors;
  const warningsList = validationFull.warnings;
  const isValid = validationFull.valid;

  const deliverySummary = useMemo(
    () => computeDeliverySummary(state.campaign, estimatedReach),
    [state.campaign, estimatedReach]
  );

  const titleLimit = state.characterLimits[selectedPlatform].title;
  const bodyLimit = state.characterLimits[selectedPlatform].body;
  const titleCount = state.campaign.message.title.length;
  const bodyCount = state.campaign.message.body.length;

  const handleNameChange = useCallback(
    (name: string) => {
      state.update({ name });
    },
    [state]
  );

  const handleSave = () => {
    if (!isValid) return;
    onSave?.(state.campaign);
  };
  const handleSendTest = () => onSendTest?.(state.campaign);
  const handleSchedule = () => {
    if (!isValid) return;
    onSchedule?.(state.campaign);
  };
  const handleSend = () => {
    if (!isValid) return;
    onSend?.(state.campaign);
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 14, color: colors.neutral.text, maxWidth: '100%' }}>
      <BuilderHeader
        campaignName={state.campaign.name}
        status={state.campaign.status}
        dirty={state.dirty}
        onCampaignNameChange={handleNameChange}
      />

      {blockingErrors.length > 0 && (
        <div
          style={{
            background: colors.dangerBg,
            border: `1px solid ${colors.dangerBorder}`,
            borderRadius: radius.input,
            padding: `${spacing[12]}px ${spacing[16]}px`,
            marginBottom: spacing[16],
          }}
        >
          <ul style={{ margin: 0, paddingLeft: '1.25rem', color: colors.danger }}>
            {blockingErrors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}

      {warningsList.length > 0 && (
        <div
          style={{
            background: colors.neutral.bg,
            border: `1px solid ${colors.neutral.border}`,
            borderRadius: radius.input,
            padding: `${spacing[12]}px ${spacing[16]}px`,
            marginBottom: spacing[16],
            fontSize: '0.875rem',
            color: colors.neutral.textMuted,
          }}
        >
          <strong style={{ display: 'block', marginBottom: spacing[4] }}>Warnings</strong>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {warningsList.map((w) => (
              <li key={w.message}>{w.message}</li>
            ))}
          </ul>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(320px, 400px)',
          gap: 24,
          alignItems: 'start',
          marginBottom: 24,
        }}
        className="kb-two-pane"
      >
        <div style={{ minWidth: 0, maxWidth: 640, overflowY: 'auto' }} className="kb-pane-left">
          {!disabledSections.includes('audience') && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="📣" title="Audience" subtitle="Choose who receives this notification">
                <SectionAudience
                  audience={state.campaign.audience}
                  estimatedReach={estimatedReach}
                  canUseTestMode
                  onUpdate={state.updateAudience}
                />
              </SectionCard>
            </div>
          )}

          {!disabledSections.includes('message') && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="✉️" title="Message content" subtitle="What users see">
                <SectionMessage
                  message={state.campaign.message}
                  titleCount={titleCount}
                  bodyCount={bodyCount}
                  titleLimit={titleLimit}
                  bodyLimit={bodyLimit}
                  selectedPlatform={selectedPlatform}
                  onUpdate={state.updateMessage}
                />
              </SectionCard>
            </div>
          )}

          {!disabledSections.includes('personalization') && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="🔤" title="Personalization" subtitle="Optional variables">
                <SectionPersonalization
                  message={state.campaign.message}
                  variableOptions={variableOptions}
                  onInsertVariable={(payload) => {
                    const token = ` {{ ${payload.variable} }}`;
                    if (payload.field === 'title') {
                      state.updateMessage({ title: state.campaign.message.title + token });
                    } else {
                      state.updateMessage({ body: state.campaign.message.body + token });
                    }
                  }}
                />
              </SectionCard>
            </div>
          )}

          {!disabledSections.includes('delivery') && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="⏱" title="Delivery controls" subtitle="When and how it sends">
                <SectionDelivery delivery={state.campaign.delivery} onUpdate={state.updateDelivery} />
              </SectionCard>
            </div>
          )}

          {!disabledSections.includes('advanced') && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="⚙️" title="Advanced" subtitle="Collapse key, silent push">
                <SectionAdvanced delivery={state.campaign.delivery} onUpdate={state.updateDelivery} />
              </SectionCard>
            </div>
          )}

          {!disabledSections.includes('tracking') && state.campaign.tracking && (
            <div style={{ marginBottom: spacing[16] }}>
              <SectionCard icon="📊" title="Tracking & analytics" subtitle="Campaign name and tags">
                <SectionTracking tracking={state.campaign.tracking} onUpdate={state.updateTracking} />
              </SectionCard>
            </div>
          )}
        </div>

        <div style={{ position: 'sticky', top: 0, overflowY: 'auto', maxHeight: 'calc(100vh - 180px)' }} className="kb-pane-right">
          <details open style={{ marginBottom: 16 }}>
            <summary style={{ padding: '12px 16px', cursor: 'pointer', fontWeight: 600, listStyle: 'none' }} className="kb-preview-summary">
              Live preview
            </summary>
            <div style={{ maxHeight: 320, overflowY: 'auto', padding: '0 16px 16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: `0 0 ${spacing[8]}px 0` }}>Live preview</h3>
              <PreviewPanel
                getPreview={state.getPreview}
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
              />
            </div>
          </details>
          <DeliverySummaryCard summary={deliverySummary} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: spacing[8],
          padding: `${spacing[16]}px 0`,
          borderTop: `1px solid ${colors.neutral.border}`,
          background: '#fff',
          boxShadow: elevation.stickyBar,
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <button
          type="button"
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, borderRadius: radius.button, cursor: 'pointer', border: `1px solid ${colors.neutral.border}`, background: '#fff', color: colors.neutral.text }}
          onClick={handleSave}
        >
          Save template
        </button>
        <button
          type="button"
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, borderRadius: radius.button, cursor: 'pointer', border: `1px solid ${colors.neutral.border}`, background: '#fff', color: colors.neutral.text }}
          onClick={handleSendTest}
        >
          Send test
        </button>
        <button
          type="button"
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, borderRadius: radius.button, cursor: 'pointer', border: `1px solid ${colors.neutral.border}`, background: '#fff', color: colors.neutral.text }}
          disabled={!canSchedule || !isValid}
          onClick={handleSchedule}
        >
          Schedule
        </button>
        <button
          type="button"
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, borderRadius: radius.button, cursor: 'pointer', border: `1px solid ${colors.primary}`, background: colors.primary, color: '#fff' }}
          disabled={!canSend || !isValid}
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (max-width: 899px) {
  .kb-two-pane { grid-template-columns: 1fr !important; grid-template-rows: auto 1fr; }
  .kb-pane-right { order: -1; position: static !important; max-height: none !important; }
  .kb-pane-left { max-width: none !important; }
}
@media (min-width: 600px) {
  .kb-preview-summary { display: none; }
}
`,
        }}
      />
    </div>
  );
}
