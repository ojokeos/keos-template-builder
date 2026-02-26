<script setup lang="ts">
import { spacing, radius, colors, typography } from '@keos/notification-builder-ui-tokens';

defineProps<{
  icon?: string;
  title: string;
  subtitle?: string;
}>();

const tokenStyles = {
  padding: `${spacing[24]}px`,
  borderRadius: `${radius.card}px`,
  gap: `${spacing[16]}px`,
  titleFontSize: `${typography.sectionTitle.fontSize}px`,
  titleFontWeight: typography.sectionTitle.fontWeight,
  subtitleFontSize: '14px',
  subtitleColor: colors.neutral.textMuted,
  iconSize: '20px',
  iconGap: `${spacing[8]}px`,
};
</script>

<template>
  <section
    class="kb-section-card"
    :style="{
      padding: tokenStyles.padding,
      borderRadius: tokenStyles.borderRadius,
    }"
  >
    <div class="kb-section-card__head">
      <span v-if="icon" class="kb-section-card__icon" :style="{ width: tokenStyles.iconSize, height: tokenStyles.iconSize, marginRight: tokenStyles.iconGap }">{{ icon }}</span>
      <div>
        <h3 class="kb-section-card__title" :style="{ fontSize: tokenStyles.titleFontSize, fontWeight: tokenStyles.titleFontWeight }">{{ title }}</h3>
        <p v-if="subtitle" class="kb-section-card__subtitle" :style="{ fontSize: tokenStyles.subtitleFontSize, color: tokenStyles.subtitleColor }">{{ subtitle }}</p>
      </div>
    </div>
    <div class="kb-section-card__body" :style="{ marginTop: tokenStyles.gap }">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.kb-section-card {
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}
.kb-section-card__head {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 100%;
}
.kb-section-card__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.kb-section-card__title {
  margin: 0 0 4px 0;
}
.kb-section-card__subtitle {
  margin: 0;
  line-height: 1.3;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
