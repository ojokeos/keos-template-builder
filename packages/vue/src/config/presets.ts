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
    id: 'otp',
    label: 'OTP',
    campaign: {
      message: {
        title: '',
        body: 'Your code is {{ .otp_code }}. Valid for 10 minutes.',
        variables: [],
        template_type: 'auth',
        template_category: 'authentication',
        template_name: 'otp_verification',
        auth_type: 'otp',
        auth_label: 'Your verification code is {{ .otp_code }}',
      } as any,
    },
  },
  {
    id: 'order-status',
    label: 'Order status',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, your order {{ .order_id }} is on its way.',
        variables: ['first_name', 'order_id'],
        template_type: 'text',
        template_category: 'utility',
        template_name: 'order_update',
      } as any,
    },
  },
  {
    id: 'promo',
    label: 'Promotion',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, we have a special offer for you.',
        variables: ['first_name'],
        template_type: 'text',
        template_category: 'marketing',
        template_name: 'promo_alert',
      } as any,
    },
  },
  {
    id: 'support-reply',
    label: 'Support reply',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, we have responded to your request.',
        variables: ['first_name'],
        template_type: 'text',
        template_category: 'utility',
        template_name: 'support_reply',
      } as any,
    },
  },
  {
    id: 'image-promo',
    label: 'Image promotion',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, tap to see the latest arrivals.',
        variables: ['first_name'],
        template_type: 'image',
        template_category: 'marketing',
        header_type: 'image',
        template_name: 'image_promo',
        header: 'New collection just dropped',
        media_url: 'https://via.placeholder.com/600x400.png?text=Promo',
      } as any,
    },
  },
  {
    id: 'video-launch',
    label: 'Video launch',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, watch this short video to see what is new.',
        variables: ['first_name'],
        template_type: 'video',
        template_category: 'marketing',
        header_type: 'video',
        template_name: 'video_launch',
        header: 'Watch our new product demo',
        media_url: 'https://example.com/video.mp4',
      } as any,
    },
  },
  {
    id: 'document-receipt',
    label: 'Document receipt',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, here is your receipt for order {{ .order_id }}.',
        variables: ['first_name', 'order_id'],
        template_type: 'document',
        template_category: 'utility',
        header_type: 'document',
        template_name: 'order_receipt',
        document_filename: 'receipt-{{ .order_id }}.pdf',
        media_url: 'https://example.com/receipt.pdf',
      } as any,
    },
  },
  {
    id: 'limited-time-offer',
    label: 'Limited time offer',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, this offer expires soon. Don’t miss out.',
        variables: ['first_name'],
        template_type: 'lto',
        template_category: 'marketing',
        template_name: 'limited_time_offer',
        lto_expiry: 'Today, 11:59 PM',
      } as any,
    },
  },
  {
    id: 'multi-product',
    label: 'Multi product message',
    campaign: {
      message: {
        title: '',
        body: 'Hi {{ .first_name }}, pick one of these products below.',
        variables: ['first_name'],
        template_type: 'mpm',
        template_category: 'marketing',
        template_name: 'multi_product',
        products: [
          {
            image: 'https://via.placeholder.com/80?text=P1',
            sectionTitle: 'Sneakers',
            productId: '$79.99',
          },
          {
            image: 'https://via.placeholder.com/80?text=P2',
            sectionTitle: 'Backpack',
            productId: '$49.00',
          },
        ],
      } as any,
    },
  },
  {
    id: 'catalog-showcase',
    label: 'Catalog showcase',
    campaign: {
      message: {
        title: '',
        body: 'Browse our latest catalog items below.',
        variables: [],
        template_type: 'catalog',
        template_category: 'marketing',
        template_name: 'catalog_showcase',
        products: [
          {
            image: 'https://via.placeholder.com/80?text=C1',
            sectionTitle: 'Jackets',
            productId: '$120.00',
          },
          {
            image: 'https://via.placeholder.com/80?text=C2',
            sectionTitle: 'Jeans',
            productId: '$89.00',
          },
        ],
      } as any,
    },
  },
  {
    id: 'auth-code',
    label: 'Authentication code',
    campaign: {
      message: {
        title: '',
        body: 'Use this code to securely sign in to your account.',
        variables: [],
        template_type: 'auth',
        template_category: 'authentication',
        template_name: 'auth_code',
        auth_code: '123 456',
        auth_type: 'otp',
        auth_label: 'Your code is {{ .otp_code }}',
      } as any,
    },
  },
  {
    id: 'flow-booking',
    label: 'Flow booking',
    campaign: {
      message: {
        title: '',
        body: 'Tap below to choose your preferred date and time.',
        variables: [],
        template_type: 'flow',
        template_category: 'utility',
        template_name: 'booking_flow',
        flow_id: 'flow_booking_v1',
        flow_cta_label: 'Start booking',
      } as any,
    },
  },
  {
    id: 'carousel-showcase',
    label: 'Carousel showcase',
    campaign: {
      message: {
        title: '',
        body: 'Swipe through our featured picks and tap to learn more.',
        variables: [],
        template_type: 'carousel',
        template_category: 'marketing',
        template_name: 'carousel_showcase',
        cards: [
          {
            id: 'card_1',
            title: 'Trail Sneakers',
            media_url: 'https://via.placeholder.com/600x400.png?text=Sneakers',
            button_label: 'View sneakers',
            button_url: 'https://example.com/sneakers',
          },
          {
            id: 'card_2',
            title: 'City Backpack',
            media_url: 'https://via.placeholder.com/600x400.png?text=Backpack',
            button_label: 'View backpack',
            button_url: 'https://example.com/backpack',
          },
        ],
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
];
