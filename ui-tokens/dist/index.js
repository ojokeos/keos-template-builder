/**
 * Design tokens for Keos Notification Builder.
 * Shared by Vue and React packages so both UIs stay visually aligned.
 */
export const spacing = {
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    24: 24,
    32: 32,
};
export const radius = {
    input: 6,
    card: 12,
    button: 6,
};
export const colors = {
    primary: '#0f172a',
    primaryHover: '#1e293b',
    danger: '#dc2626',
    dangerBg: '#fef2f2',
    dangerBorder: '#fecaca',
    neutral: {
        border: '#e2e8f0',
        bg: '#f8fafc',
        bgCard: '#f1f5f9',
        text: '#0f172a',
        textMuted: '#64748b',
        textMeta: '#475569',
    },
};
export const typography = {
    sectionTitle: {
        fontSize: 16,
        fontWeight: 600,
    },
    label: {
        fontSize: 14,
        fontWeight: 500,
    },
    helper: {
        fontSize: 13,
        color: colors.neutral.textMuted,
    },
    metadata: {
        fontSize: 14,
        color: colors.neutral.textMeta,
    },
};
export const elevation = {
    card: '0 1px 3px rgba(0,0,0,0.1)',
    stickyBar: '0 -1px 4px rgba(0,0,0,0.08)',
};
//# sourceMappingURL=index.js.map