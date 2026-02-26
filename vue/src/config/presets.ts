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
        title_template: 'Heads up',
        body_template: 'Your update is ready.',
        variables_used: [],
      },
    },
  },
  {
    id: 'promo-image',
    label: 'Promotion with image',
    campaign: {
      message: {
        title_template: 'Special offer inside',
        body_template: 'Tap to see your exclusive deal.',
        image_url: 'https://example.com/promo.png',
        variables_used: [],
      },
    },
  },
  {
    id: 'transactional',
    label: 'Transactional',
    campaign: {
      message: {
        title_template: 'Order {{ order_id }} update',
        body_template: 'Hi {{ first_name }}, your order has shipped.',
        variables_used: ['first_name', 'order_id'],
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
        title_template: '',
        body_template: '',
        variables_used: [],
        whatsapp_template_type: 'text',
        whatsapp_template_name: 'otp_verification',
        whatsapp_body: 'Your code is {{ otp_code }}. Valid for 10 minutes.',
      } as any,
    },
  },
  {
    id: 'order-status',
    label: 'Order status',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name', 'order_id'],
        whatsapp_template_type: 'text',
        whatsapp_template_name: 'order_update',
        whatsapp_body: 'Hi {{ first_name }}, your order {{ order_id }} is on its way.',
      } as any,
    },
  },
  {
    id: 'promo',
    label: 'Promotion',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'text',
        whatsapp_template_name: 'promo_alert',
        whatsapp_body: 'Hi {{ first_name }}, we have a special offer for you.',
      } as any,
    },
  },
  {
    id: 'support-reply',
    label: 'Support reply',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'text',
        whatsapp_template_name: 'support_reply',
        whatsapp_body: 'Hi {{ first_name }}, we have responded to your request.',
      } as any,
    },
  },
  {
    id: 'image-promo',
    label: 'Image promotion',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'image',
        whatsapp_template_name: 'image_promo',
        whatsapp_header: 'New collection just dropped',
        whatsapp_media_url: 'https://via.placeholder.com/600x400.png?text=Promo',
        whatsapp_body: 'Hi {{ first_name }}, tap to see the latest arrivals.',
      } as any,
    },
  },
  {
    id: 'video-launch',
    label: 'Video launch',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'video',
        whatsapp_template_name: 'video_launch',
        whatsapp_header: 'Watch our new product demo',
        whatsapp_media_url: 'https://example.com/video.mp4',
        whatsapp_body: 'Hi {{ first_name }}, watch this short video to see what is new.',
      } as any,
    },
  },
  {
    id: 'document-receipt',
    label: 'Document receipt',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name', 'order_id'],
        whatsapp_template_type: 'document',
        whatsapp_template_name: 'order_receipt',
        whatsapp_document_filename: 'receipt-{{ order_id }}.pdf',
        whatsapp_media_url: 'https://example.com/receipt.pdf',
        whatsapp_body: 'Hi {{ first_name }}, here is your receipt for order {{ order_id }}.',
      } as any,
    },
  },
  {
    id: 'location-store',
    label: 'Store location',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'location',
        whatsapp_template_name: 'store_location',
        whatsapp_body: 'Hi {{ first_name }}, here is the location of our nearest store.',
        whatsapp_location: {
          lat: 6.5244,
          lon: 3.3792,
          name: 'Lagos Flagship Store',
          address: '12 Marina Rd, Lagos',
        },
      } as any,
    },
  },
  {
    id: 'coupon-offer',
    label: 'Coupon offer',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'coupon',
        whatsapp_template_name: 'coupon_offer',
        whatsapp_body: 'Hi {{ first_name }}, use this code at checkout for a discount.',
        whatsapp_coupon_code: 'SAVE20',
      } as any,
    },
  },
  {
    id: 'limited-time-offer',
    label: 'Limited time offer',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'lto',
        whatsapp_template_name: 'limited_time_offer',
        whatsapp_body: 'Hi {{ first_name }}, this offer expires soon. Don’t miss out.',
        whatsapp_lto_expiry: 'Today, 11:59 PM',
      } as any,
    },
  },
  {
    id: 'multi-product',
    label: 'Multi product message',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        whatsapp_template_type: 'mpm',
        whatsapp_template_name: 'multi_product',
        whatsapp_body: 'Hi {{ first_name }}, pick one of these products below.',
        whatsapp_products: [
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
        title_template: '',
        body_template: '',
        variables_used: [],
        whatsapp_template_type: 'catalog',
        whatsapp_template_name: 'catalog_showcase',
        whatsapp_body: 'Browse our latest catalog items below.',
        whatsapp_products: [
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
        title_template: '',
        body_template: '',
        variables_used: [],
        whatsapp_template_type: 'auth',
        whatsapp_template_name: 'auth_code',
        whatsapp_body: 'Use this code to securely sign in to your account.',
        whatsapp_auth_code: '123 456',
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
        title_template: '',
        body_template: 'Your appointment is confirmed for tomorrow at 10am.',
        variables_used: [],
        sms_sender_id: 'YourBrand',
        sms_body: 'Your appointment is confirmed for tomorrow at 10am.',
      } as any,
    },
  },
  {
    id: 'otp',
    label: 'OTP',
    campaign: {
      message: {
        title_template: '',
        body_template: 'Your code: {{ otp_code }}',
        variables_used: ['otp_code'],
        sms_sender_id: 'YourBrand',
        sms_body: 'Your code: {{ otp_code }}',
      } as any,
    },
  },
  {
    id: 'shipping',
    label: 'Shipping update',
    campaign: {
      message: {
        title_template: '',
        body_template: 'Hi {{ first_name }}, your order {{ order_id }} has shipped.',
        variables_used: ['first_name', 'order_id'],
        sms_sender_id: 'YourBrand',
        sms_body: 'Hi {{ first_name }}, your order {{ order_id }} has shipped.',
      } as any,
    },
  },
  {
    id: 'promo',
    label: 'Promo text',
    campaign: {
      message: {
        title_template: '',
        body_template: 'Flash sale today! Use SAVE20 at checkout. {{ link }}',
        variables_used: ['link'],
        sms_sender_id: 'YourBrand',
        sms_body: 'Flash sale today! Use SAVE20 at checkout. {{ link }}',
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
        title_template: '',
        body_template: '',
        variables_used: [],
        email_subject: 'Important update',
        email_preview_text: 'We have news for you.',
        email_from_name: 'Your Brand',
        email_from_address: 'hello@example.com',
        email_blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Important update' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ first_name }}, here is what\'s new.' },
        ],
      } as any,
    },
  },
  {
    id: 'newsletter',
    label: 'Newsletter',
    campaign: {
      message: {
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        email_subject: 'Your weekly digest',
        email_preview_text: 'Top stories and updates',
        email_from_name: 'Your Brand',
        email_from_address: 'news@example.com',
        email_blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Weekly digest' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ first_name }}, here are this week\'s highlights.' },
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
        title_template: '',
        body_template: '',
        variables_used: ['first_name'],
        email_subject: 'Special offer for you, {{ first_name }}',
        email_preview_text: 'Limited time only',
        email_from_name: 'Your Brand',
        email_from_address: 'offers@example.com',
        email_blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Exclusive offer' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ first_name }}, enjoy 20% off your next order.' },
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
        title_template: '',
        body_template: '',
        variables_used: ['first_name', 'order_id'],
        email_subject: 'Receipt for order {{ order_id }}',
        email_preview_text: 'Thank you for your order',
        email_from_name: 'Your Brand',
        email_from_address: 'orders@example.com',
        email_blocks: [
          { id: 'h1', type: 'heading', level: 1, content: 'Thank you for your order' },
          { id: 'p1', type: 'paragraph', content: 'Hi {{ first_name }}, we received your order {{ order_id }}.' },
        ],
      } as any,
    },
  },
];
