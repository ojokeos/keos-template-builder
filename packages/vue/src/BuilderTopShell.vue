<script setup lang="ts">
import { spacing } from '@keos/notification-builder-ui-tokens';
</script>

<template>
  <div
    class="kb-top-shell"
    :style="{
      marginLeft: spacing[24],
      marginRight: spacing[24],
    }"
  >
    <slot name="header" />
    <slot name="errors" />
    <slot name="warnings" />
    <slot />
  </div>
</template>
