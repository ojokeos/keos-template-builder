import { useState } from 'react';
import { KeosNotificationBuilder } from '@keos/notification-builder-react';
import type { Campaign } from '@keos/notification-builder-core';

export default function App() {
  const [campaign, setCampaign] = useState<Partial<Campaign>>(undefined);

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Push Notification Builder (React)</h1>
      <KeosNotificationBuilder
        campaign={campaign}
        onChange={setCampaign}
        onSave={(c) => {
          console.log('Save', c);
          alert('Saved (see console)');
        }}
        onSendTest={(c) => {
          console.log('Send test', c);
          alert('Send test (see console)');
        }}
        onSchedule={(c) => {
          console.log('Schedule', c);
          alert('Scheduled (see console)');
        }}
        onSend={(c) => {
          console.log('Send', c);
          alert('Send (see console)');
        }}
      />
    </div>
  );
}
