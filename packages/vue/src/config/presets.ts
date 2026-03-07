import type { Campaign } from '@keos/notification-builder-core';

export interface PresetOption {
  id: string;
  label: string;
  /** Partial campaign to merge into current (message, delivery, etc.) */
  campaign: Partial<Campaign>;
}

export const PUSH_PRESETS: PresetOption[] = [
  {
    id: 'simple-alert',
    label: 'Simple alert',
    campaign: {
      message: {
        title: 'Heads up',
        body: 'Your update is ready.',
        variables: [],
      },
    },
  },
  {
    id: 'promo-image',
    label: 'Promotion with image',
    campaign: {
      message: {
        title: 'Special offer inside',
        body: 'Tap to see your exclusive deal.',
        image_url: 'https://example.com/promo.png',
        variables: [],
      },
    },
  },
  {
    id: 'transactional',
    label: 'Transactional',
    campaign: {
      message: {
        title: 'Order {{ .order_id }} update',
        body: 'Hi {{ .first_name }}, your order has shipped.',
        variables: ['first_name', 'order_id'],
      },
    },
  },
  {
    id: 'location-alert',
    label: 'Location / Store nearby',
    campaign: {
      message: {
        title: "We're nearby",
        body: 'Visit our store - tap to open in maps.',
        variables: [],
        location: {
          lat: 6.5244,
          lon: 3.3792,
          name: 'Flagship Store',
          address: '12 Marina Rd, Lagos',
        },
      },
    },
  },
];

export const WHATSAPP_PRESETS: PresetOption[] = [
  {
    id: 'wa-text-simple',
    label: 'Text - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, your order is confirmed.',
        variables: ['first_name'],
        template_type: 'text',
        template_category: 'utility',
        template_name: 'wa_text_simple',
      } as any,
    },
  },
  {
    id: 'wa-text-complex',
    label: 'Text - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, your order {{ .order_id }} has shipped and will arrive by tomorrow.',
        variables: ['first_name', 'order_id'],
        template_type: 'text',
        template_category: 'utility',
        template_name: 'wa_text_complex',
        header_type: 'text',
        header: 'Order update',
        footer: 'Reply STOP to unsubscribe',
        buttons: [
          { id: 'btn_1', label: 'Track order', type: 'url', url: 'https://example.com/orders/{{ .order_id }}' },
          { id: 'btn_2', label: 'Contact support', type: 'quick_reply' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-image-simple',
    label: 'Image - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, discover our latest collection.',
        variables: ['first_name'],
        template_type: 'image',
        template_category: 'marketing',
        template_name: 'wa_image_simple',
        header_type: 'image',
        media_url: 'https://via.placeholder.com/600x400.png?text=New+Collection',
      } as any,
    },
  },
  {
    id: 'wa-image-complex',
    label: 'Image - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, enjoy 25% off selected items this weekend only.',
        variables: ['first_name'],
        template_type: 'image',
        template_category: 'marketing',
        template_name: 'wa_image_complex',
        header_type: 'image',
        header: 'Weekend flash sale',
        media_url: 'https://via.placeholder.com/600x400.png?text=Flash+Sale',
        footer: 'Offer valid while stock lasts',
        buttons: [
          { id: 'btn_1', label: 'View deals', type: 'url', url: 'https://example.com/deals' },
          { id: 'btn_2', label: 'Not interested', type: 'opt_out' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-video-simple',
    label: 'Video - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Watch this quick update on our newest product.',
        variables: [],
        template_type: 'video',
        template_category: 'marketing',
        header_type: 'video',
        template_name: 'wa_video_simple',
        media_url: 'https://example.com/product-teaser.mp4',
      } as any,
    },
  },
  {
    id: 'wa-video-complex',
    label: 'Video - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, check the demo and tap below to book a session.',
        variables: ['first_name'],
        template_type: 'video',
        template_category: 'marketing',
        header_type: 'video',
        template_name: 'wa_video_complex',
        header: 'Live product walkthrough',
        media_url: 'https://example.com/live-walkthrough.mp4',
        footer: 'Spots are limited',
        buttons: [
          { id: 'btn_1', label: 'Book slot', type: 'url', url: 'https://example.com/book-demo' },
          { id: 'btn_2', label: 'Remind me later', type: 'quick_reply' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-document-simple',
    label: 'Document - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Please find your invoice attached.',
        variables: [],
        template_type: 'document',
        template_category: 'utility',
        header_type: 'document',
        template_name: 'wa_document_simple',
        document_filename: 'invoice.pdf',
        media_url: 'https://example.com/invoice.pdf',
      } as any,
    },
  },
  {
    id: 'wa-document-complex',
    label: 'Document - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, here is the receipt for order {{ .order_id }}.',
        variables: ['first_name', 'order_id'],
        template_type: 'document',
        template_category: 'utility',
        header_type: 'document',
        template_name: 'wa_document_complex',
        document_filename: 'receipt-{{ .order_id }}.pdf',
        media_url: 'https://example.com/receipt.pdf',
        footer: 'For questions, reply to this message',
        buttons: [
          { id: 'btn_1', label: 'Download again', type: 'url', url: 'https://example.com/receipt/{{ .order_id }}' },
          { id: 'btn_2', label: 'Need help', type: 'quick_reply' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-carousel-simple',
    label: 'Carousel - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Swipe through our featured picks.',
        variables: [],
        template_type: 'carousel',
        template_category: 'marketing',
        template_name: 'wa_carousel_simple',
        cards: [
          {
            id: 'card_1',
            title: 'Starter Bundle',
            media_url: 'https://via.placeholder.com/600x400.png?text=Starter',
            button_label: 'View',
            button_url: 'https://example.com/starter',
          },
        ],
      } as any,
    },
  },
  {
    id: 'wa-carousel-complex',
    label: 'Carousel - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, explore these personalized recommendations.',
        variables: ['first_name'],
        template_type: 'carousel',
        template_category: 'marketing',
        template_name: 'wa_carousel_complex',
        cards: [
          {
            id: 'card_1',
            title: 'Trail Sneakers',
            media_url: 'https://via.placeholder.com/600x400.png?text=Sneakers',
            button_label: 'Shop sneakers',
            button_url: 'https://example.com/sneakers',
          },
          {
            id: 'card_2',
            title: 'City Backpack',
            media_url: 'https://via.placeholder.com/600x400.png?text=Backpack',
            button_label: 'Shop backpack',
            button_url: 'https://example.com/backpack',
          },
          {
            id: 'card_3',
            title: 'Fitness Watch',
            media_url: 'https://via.placeholder.com/600x400.png?text=Watch',
            button_label: 'Shop watch',
            button_url: 'https://example.com/watch',
          },
        ],
      } as any,
    },
  },
  {
    id: 'wa-flow-simple',
    label: 'Flow - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Tap below to complete your request in a guided flow.',
        variables: [],
        template_type: 'flow',
        template_category: 'utility',
        template_name: 'wa_flow_simple',
        flow_id: 'flow_support_v1',
        flow_cta_label: 'Open flow',
      } as any,
    },
  },
  {
    id: 'wa-flow-complex',
    label: 'Flow - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, use the flow to choose your slot and confirm.',
        variables: ['first_name'],
        template_type: 'flow',
        template_category: 'utility',
        template_name: 'wa_flow_complex',
        flow_id: 'flow_booking_v2',
        flow_cta_label: 'Start booking',
        footer: 'Estimated completion time: 1 minute',
        buttons: [{ id: 'btn_1', label: 'Need agent help', type: 'quick_reply' }],
      } as any,
    },
  },
  {
    id: 'wa-lto-simple',
    label: 'Limited-time offer - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Offer ends today. Tap to claim now.',
        variables: [],
        template_type: 'lto',
        template_category: 'marketing',
        template_name: 'wa_lto_simple',
        lto_expiry: 'Today, 11:59 PM',
      } as any,
    },
  },
  {
    id: 'wa-lto-complex',
    label: 'Limited-time offer - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, your exclusive deal expires soon. Don’t miss it.',
        variables: ['first_name'],
        template_type: 'lto',
        template_category: 'marketing',
        template_name: 'wa_lto_complex',
        lto_expiry: 'Today, 11:59 PM',
        header_type: 'text',
        header: 'Last chance offer',
        footer: 'Terms apply',
        buttons: [{ id: 'btn_1', label: 'Claim now', type: 'url', url: 'https://example.com/claim' }],
      } as any,
    },
  },
  {
    id: 'wa-catalog-simple',
    label: 'Catalog - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Browse our catalog for the latest products.',
        variables: [],
        template_type: 'catalog',
        template_category: 'marketing',
        template_name: 'wa_catalog_simple',
        products: [
          { image: 'https://via.placeholder.com/80?text=C1', sectionTitle: 'Featured', productId: 'CAT-001' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-catalog-complex',
    label: 'Catalog - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, browse our curated catalog sections.',
        variables: ['first_name'],
        template_type: 'catalog',
        template_category: 'marketing',
        template_name: 'wa_catalog_complex',
        footer: 'Updated daily',
        products: [
          { image: 'https://via.placeholder.com/80?text=C1', sectionTitle: 'Jackets', productId: 'CAT-JACKETS' },
          { image: 'https://via.placeholder.com/80?text=C2', sectionTitle: 'Jeans', productId: 'CAT-JEANS' },
          { image: 'https://via.placeholder.com/80?text=C3', sectionTitle: 'Accessories', productId: 'CAT-ACC' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-mpm-simple',
    label: 'Multi-product - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Pick one of these top products.',
        variables: [],
        template_type: 'mpm',
        template_category: 'marketing',
        template_name: 'wa_mpm_simple',
        products: [
          { image: 'https://via.placeholder.com/80?text=P1', sectionTitle: 'Sneakers', productId: '$79.99' },
          { image: 'https://via.placeholder.com/80?text=P2', sectionTitle: 'Backpack', productId: '$49.00' },
        ],
      } as any,
    },
  },
  {
    id: 'wa-mpm-complex',
    label: 'Multi-product - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, we selected these products for you.',
        variables: ['first_name'],
        template_type: 'mpm',
        template_category: 'marketing',
        template_name: 'wa_mpm_complex',
        footer: 'Prices subject to change',
        products: [
          { image: 'https://via.placeholder.com/80?text=P1', sectionTitle: 'Trail Sneakers', productId: '$89.99' },
          { image: 'https://via.placeholder.com/80?text=P2', sectionTitle: 'Travel Backpack', productId: '$59.00' },
          { image: 'https://via.placeholder.com/80?text=P3', sectionTitle: 'Fitness Watch', productId: '$129.00' },
        ],
        buttons: [{ id: 'btn_1', label: 'Talk to sales', type: 'quick_reply' }],
      } as any,
    },
  },
  {
    id: 'wa-auth-simple',
    label: 'Authentication - Simple',
    campaign: {
      message: {
        title: '',
        body: 'Your code is {{ .otp_code }}. Valid for 10 minutes.',
        variables: ['otp_code'],
        template_type: 'auth',
        template_category: 'authentication',
        template_name: 'wa_auth_simple',
        auth_type: 'otp',
        auth_label: 'Your verification code',
        auth_code: '123456',
      } as any,
    },
  },
  {
    id: 'wa-auth-complex',
    label: 'Authentication - Complex',
    campaign: {
      message: {
        title: '',
        body: 'Use {{ .otp_code }} to sign in. If this was not you, ignore this message.',
        variables: ['otp_code'],
        template_type: 'auth',
        template_category: 'authentication',
        template_name: 'wa_auth_complex',
        auth_type: 'login',
        auth_label: 'Secure sign-in code',
        auth_code: '123456',
        footer: 'Do not share this code',
      } as any,
    },
  },
];

export const SMS_PRESETS: PresetOption[] = [
  {
    id: 'short-alert',
    label: 'Short alert',
    campaign: {
      message: {
        title: '',
        body: 'Your appointment is confirmed for tomorrow at 10am.',
        variables: [],
        sender_id: 'YourBrand',
      } as any,
    },
  },
  {
    id: 'otp',
    label: 'OTP',
    campaign: {
      message: {
        title: '',
        body: 'Your code: {{ .otp_code }}',
        variables: ['otp_code'],
        sender_id: 'YourBrand',
      } as any,
    },
  },
  {
    id: 'shipping',
    label: 'Shipping update',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, your order {{ .order_id }} has shipped.',
        variables: ['first_name', 'order_id'],
        sender_id: 'YourBrand',
      } as any,
    },
  },
  {
    id: 'promo',
    label: 'Promo text',
    campaign: {
      message: {
        title: '',
        body: 'Flash sale today! Use SAVE20 at checkout. {{ .link }}',
        variables: ['link'],
        sender_id: 'YourBrand',
      } as any,
    },
  },
];

export const EMAIL_PRESETS: PresetOption[] = [
  {
    id: 'announcement',
    label: 'Announcement',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: [],
        subject: 'Important update',
        preview_text: 'We have news for you.',
        from_name: 'Your Brand',
        from_address: 'hello@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Important update' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, here is what\'s new.' },
        ],
      } as any,
    },
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name'],
        subject: 'Your weekly digest',
        preview_text: 'Top stories and updates',
        from_name: 'Your Brand',
        from_address: 'news@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Weekly digest' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, here are this week\'s highlights.' },
          { id: 'btn1', type: 'button', text: 'Read more', url: 'https://example.com' },
        ],
      } as any,
    },
  },
  {
    id: 'offer',
    label: 'Offer',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name'],
        subject: 'Special offer for you, {{ .first_name }}',
        preview_text: 'Limited time only',
        from_name: 'Your Brand',
        from_address: 'offers@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Exclusive offer' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, enjoy 20% off your next order.' },
          { id: 'btn1', type: 'button', text: 'Claim offer', url: 'https://example.com/offer' },
        ],
      } as any,
    },
  },
  {
    id: 'receipt',
    label: 'Receipt',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name', 'order_id'],
        subject: 'Receipt for order {{ .order_id }}',
        preview_text: 'Thank you for your order',
        from_name: 'Your Brand',
        from_address: 'orders@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Thank you for your order' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, we received your order {{ .order_id }}.' },
        ],
      } as any,
    },
  },
  {
    id: 'abandoned-cart-complex',
    label: 'Abandoned cart (complex)',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name', 'cart_value', 'checkout_url', 'support_email'],
        subject: '{{ .first_name }}, your cart is waiting',
        preview_text: 'Items in your cart are almost sold out.',
        from_name: 'Luma Store',
        from_address: 'hello@lumastore.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'You left something behind', alignment: 'left' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, your selected items are still available. Complete checkout before they go out of stock.' },
          { id: 'pc1', type: 'product_card', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900', title: 'Urban Trail Jacket', price: '$89.00', buttonText: 'Return to cart', buttonUrl: '{{ .checkout_url }}' },
          { id: 'sp1', type: 'spacer', height: 12 },
          { id: 'row1', type: 'row', columnCount: 2, cells: ['Cart value', '{{ .cart_value }}'] },
          { id: 'btn1', type: 'button', text: 'Complete purchase', url: '{{ .checkout_url }}', fullWidth: true, borderRadius: 8 },
          { id: 'q1', type: 'quote', style: 'warning', content: 'This cart expires in 24 hours.' },
          { id: 'f1', type: 'footer', content: 'Need help? Contact {{ .support_email }}' },
        ],
      } as any,
    },
  },
  {
    id: 'saas-onboarding-complex',
    label: 'SaaS onboarding (complex)',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name', 'workspace_name', 'dashboard_url', 'docs_url'],
        subject: 'Welcome to Keos Cloud, {{ .first_name }}',
        preview_text: 'Your workspace is ready. Start in under 5 minutes.',
        from_name: 'Keos Cloud',
        from_address: 'product@keoscloud.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Welcome to {{ .workspace_name }}' },
          { id: 'p1', type: 'paragraph', content: 'You are all set. Here is your recommended setup path:' },
          { id: 'list1', type: 'list', style: 'numbered', items: ['Create your first campaign', 'Connect your delivery provider', 'Send a test to your device'] },
          { id: 'btn1', type: 'button', text: 'Open dashboard', url: '{{ .dashboard_url }}', borderRadius: 8 },
          { id: 'cols1', type: 'columns', leftContent: 'Watch 3-min setup video', rightContent: 'Read implementation docs' },
          { id: 'links1', type: 'link_list', separator: '•', links: [{ text: 'Docs', url: '{{ .docs_url }}' }, { text: 'API Reference', url: 'https://docs.keos.dev/api' }, { text: 'Status Page', url: 'https://status.keos.dev' }] },
          { id: 'social1', type: 'social', links: [{ platform: 'linkedin', url: 'https://linkedin.com/company/keos' }, { platform: 'twitter', url: 'https://x.com/keos' }] },
          { id: 'f1', type: 'footer', content: 'You are receiving this because your team created a Keos Cloud account.' },
        ],
      } as any,
    },
  },
  {
    id: 'invoice-dunning-complex',
    label: 'Invoice reminder (complex)',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name', 'invoice_id', 'due_date', 'amount_due', 'pay_url'],
        subject: 'Invoice {{ .invoice_id }} is due on {{ .due_date }}',
        preview_text: 'Payment reminder for your active subscription.',
        from_name: 'Billing Desk',
        from_address: 'billing@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Payment reminder' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ .first_name }}, this is a reminder that invoice {{ .invoice_id }} is due soon.' },
          { id: 'row1', type: 'row', columnCount: 2, cells: ['Amount due', '{{ .amount_due }}'] },
          { id: 'row2', type: 'row', columnCount: 2, cells: ['Due date', '{{ .due_date }}'] },
          { id: 'btn1', type: 'button', text: 'Pay invoice', url: '{{ .pay_url }}', fullWidth: true, borderRadius: 6 },
          { id: 'acc1', type: 'accordion', items: [{ title: 'Accepted payment methods', content: 'Visa, Mastercard, ACH bank transfer.' }, { title: 'Need an extension?', content: 'Contact billing support before the due date.' }] },
          { id: 'code1', type: 'code_block', content: '{{ .invoice_id }}', caption: 'Reference ID' },
          { id: 'f1', type: 'footer', content: 'If payment has already been made, please ignore this reminder.' },
        ],
      } as any,
    },
  },
  {
    id: 'webinar-reminder-complex',
    label: 'Webinar reminder (complex)',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['first_name', 'event_title', 'start_time', 'join_url', 'timezone'],
        subject: 'Reminder: {{ .event_title }} starts at {{ .start_time }}',
        preview_text: 'Join link and agenda inside.',
        from_name: 'Events Team',
        from_address: 'events@example.com',
        blocks: [
          { id: 'img1', type: 'image', src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200', alt: 'Webinar session', fullWidth: true },
          { id: 'h1', type: 'heading', level: 1, content: 'See you soon, {{ .first_name }}' },
          { id: 'p1', type: 'paragraph', content: '{{ .event_title }} starts at {{ .start_time }} ({{ .timezone }}).' },
          { id: 'btn1', type: 'button', text: 'Join webinar', url: '{{ .join_url }}', fullWidth: true, borderRadius: 999 },
          { id: 'nav1', type: 'navbar', separator: '•', links: [{ text: 'Add to calendar', url: '{{ .join_url }}' }, { text: 'Speaker bios', url: 'https://example.com/speakers' }, { text: 'FAQ', url: 'https://example.com/faq' }] },
          { id: 'q1', type: 'quote', style: 'info', content: 'Tip: join 5 minutes early for audio checks.' },
          { id: 'f1', type: 'footer', content: 'You are receiving this event reminder because you registered for this webinar.' },
        ],
      } as any,
    },
  },
  {
    id: 'incident-update-complex',
    label: 'Incident update (complex)',
    campaign: {
      message: {
        title: '',
        body: '',
        variables: ['incident_id', 'service_name', 'status_page_url', 'next_update_time'],
        subject: 'Incident {{ .incident_id }} update: {{ .service_name }}',
        preview_text: 'Current status, impact, and next update window.',
        from_name: 'Ops Status',
        from_address: 'status@example.com',
        blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Service incident update' },
          { id: 'q1', type: 'quote', style: 'warning', content: '{{ .service_name }} is currently degraded. Engineers are actively investigating.' },
          { id: 'row1', type: 'row', columnCount: 2, cells: ['Incident ID', '{{ .incident_id }}'] },
          { id: 'row2', type: 'row', columnCount: 2, cells: ['Next update', '{{ .next_update_time }}'] },
          { id: 'btn1', type: 'button', text: 'View live status', url: '{{ .status_page_url }}', borderRadius: 6 },
          { id: 'div1', type: 'divider', thickness: 1, color: '#d1d5db', lineStyle: 'solid' },
          { id: 'p1', type: 'paragraph', content: 'We will continue to share updates until the issue is fully resolved.' },
          { id: 'f1', type: 'footer', content: 'This is a service notification email.' },
        ],
      } as any,
    },
  },
];
