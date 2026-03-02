<script setup lang="ts">
import { ref } from 'vue';
import { KeosNotificationBuilder, KeosWhatsAppBuilder } from '@keos/notification-builder-vue';
import KeosSmsBuilder from '../../packages/vue/src/KeosSmsBuilder.vue';
import KeosEmailBuilder from '../../packages/vue/src/KeosEmailBuilder.vue';
import type { Campaign } from '@keos/notification-builder-core';

const campaign = ref<Partial<Campaign>>({});
const activeTab = ref<'push' | 'whatsapp' | 'sms' | 'email'>('push');

function onSave(c: Campaign) {
  console.log('Save', c);
  alert('Saved (see console)');
}

function onSendTest(c: Campaign) {
  console.log('Send test', c);
  alert('Send test (see console)');
}

function onSchedule(c: Campaign) {
  console.log('Schedule', c);
  alert('Scheduled (see console)');
}

function onSend(c: Campaign) {
  console.log('Send', c);
  alert('Send (see console)');
}

function onChange(c: Campaign) {
  campaign.value = c;
}
</script>

<template>
  <div style="padding: 2rem; max-width: 900px; margin: 0 auto;">
    <h1 style="margin-bottom: 1.5rem;">Keos Template Builder</h1>

    <div
      style="
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
      "
    >
      <button
        type="button"
        @click="activeTab = 'push'"
        :style="{
          padding: '0.5rem 1rem',
          border: 'none',
          borderBottom: activeTab === 'push' ? '2px solid #2563eb' : '2px solid transparent',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontWeight: activeTab === 'push' ? '600' : '400',
          color: activeTab === 'push' ? '#111827' : '#6b7280'
        }"
      >
        Push Builder
      </button>
      <button
        type="button"
        @click="activeTab = 'whatsapp'"
        :style="{
          padding: '0.5rem 1rem',
          border: 'none',
          borderBottom: activeTab === 'whatsapp' ? '2px solid #2563eb' : '2px solid transparent',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontWeight: activeTab === 'whatsapp' ? '600' : '400',
          color: activeTab === 'whatsapp' ? '#111827' : '#6b7280'
        }"
      >
        WhatsApp Builder
      </button>
      <button
        type="button"
        @click="activeTab = 'sms'"
        :style="{
          padding: '0.5rem 1rem',
          border: 'none',
          borderBottom: activeTab === 'sms' ? '2px solid #2563eb' : '2px solid transparent',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontWeight: activeTab === 'sms' ? '600' : '400',
          color: activeTab === 'sms' ? '#111827' : '#6b7280'
        }"
      >
        SMS Builder
      </button>
      <button
        type="button"
        @click="activeTab = 'email'"
        :style="{
          padding: '0.5rem 1rem',
          border: 'none',
          borderBottom: activeTab === 'email' ? '2px solid #2563eb' : '2px solid transparent',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          fontWeight: activeTab === 'email' ? '600' : '400',
          color: activeTab === 'email' ? '#111827' : '#6b7280'
        }"
      >
        Email Builder
      </button>
    </div>

    <div>
      <KeosNotificationBuilder
        v-if="activeTab === 'push'"
        :model-value="campaign"
        @update:model-value="campaign = $event"
        @change="onChange"
        @save="onSave"
        @send-test="onSendTest"
        @schedule="onSchedule"
        @send="onSend"

      />

      <KeosWhatsAppBuilder
        v-else-if="activeTab === 'whatsapp'"
        :model-value="campaign"
        @update:model-value="campaign = $event"
        @change="onChange"
        @save="onSave"
        @send-test="onSendTest"
        @schedule="onSchedule"
        @send="onSend"
        :actions-note="'Changes auto-saved'"
      />

      <KeosSmsBuilder
        v-else-if="activeTab === 'sms'"
        :model-value="campaign"
        @update:model-value="campaign = $event"
        @change="onChange"
        @save="onSave"
        @send-test="onSendTest"
        @schedule="onSchedule"
        @send="onSend"
      />

      <KeosEmailBuilder
        v-else
        :model-value="campaign"
        @update:model-value="campaign = $event"
        @change="onChange"
        @save="onSave"
        @send-test="onSendTest"
        @schedule="onSchedule"
        @send="onSend"
      />
    </div>
  </div>
</template>
