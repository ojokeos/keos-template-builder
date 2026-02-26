import type { ReactNode } from 'react';
import { spacing, radius, colors, typography } from '@keos/notification-builder-ui-tokens';

export function SectionCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        padding: `${spacing[24]}px`,
        borderRadius: `${radius.card}px`,
        background: colors.neutral.bgCard,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[8] }}>
        {icon && (
          <span
            style={{
              width: 20,
              height: 20,
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            {icon}
          </span>
        )}
        <div>
          <h3 style={{ fontSize: typography.sectionTitle.fontSize, fontWeight: typography.sectionTitle.fontWeight, margin: '0 0 4px 0' }}>
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontSize: 14, color: colors.neutral.textMuted, margin: 0, lineHeight: 1.3 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div style={{ marginTop: spacing[16] }}>{children}</div>
    </section>
  );
}
