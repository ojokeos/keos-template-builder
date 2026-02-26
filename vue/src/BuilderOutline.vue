<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { spacing, colors, radius } from '@keos/notification-builder-ui-tokens';

export interface OutlineItem {
  id: string;
  label: string;
}

const props = defineProps<{
  items: OutlineItem[];
  /** Id of the scroll container (sidebar) so we can scroll to section */
  scrollContainerId?: string;
}>();

const activeId = ref<string>(props.items[0]?.id ?? '');

let observer: IntersectionObserver | null = null;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

onMounted(() => {
  const container = props.scrollContainerId
    ? document.getElementById(props.scrollContainerId)
    : document;
  if (!container) return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-outline-id');
          if (id) activeId.value = id;
        }
      }
    },
    { root: container === document ? null : container, rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  );
  props.items.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) observer?.observe(el);
  });
});

onUnmounted(() => {
  observer?.disconnect();
});

watch(
  () => props.items,
  (items) => {
    if (items.length && !activeId.value) activeId.value = items[0].id;
  },
  { immediate: true }
);
</script>

<template>
  <nav class="kb-outline" aria-label="Sections">
    <ul class="kb-outline__list" :style="{ padding: 0, margin: 0, listStyle: 'none' }">
      <li v-for="item in items" :key="item.id" class="kb-outline__item">
        <button
          type="button"
          class="kb-outline__btn"
          :class="{ 'kb-outline__btn--active': activeId === item.id }"
          :style="{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: `${spacing[8]}px ${spacing[12]}px`,
            border: 'none',
            borderRadius: `${radius.input}px`,
            background: activeId === item.id ? colors.neutral.bg : 'transparent',
            color: activeId === item.id ? '#0f172a' : colors.neutral.textMuted,
            fontSize: '0.8125rem',
            fontWeight: activeId === item.id ? 600 : 500,
            cursor: 'pointer',
          }"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.kb-outline__btn:hover {
  background: #f8fafc;
  color: #334155;
}
.kb-outline__item {
  margin-bottom: 2px;
}
</style>
