// Google Analytics 4 Configuration
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 measurement ID

// Analytics Event Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Google Analytics 4 Functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

// Track custom events
export const trackEvent = (event: AnalyticsEvent) => {
  gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters,
  });
};

// E-commerce specific tracking functions
export const trackPurchase = (transactionId: string, items: any[], value: number) => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: 'INR',
    items: items.map(item => ({
      item_id: item.saree.id,
      item_name: item.saree.name,
      item_category: item.saree.category,
      quantity: item.quantity,
      price: item.saree.price,
    })),
  });
};

export const trackAddToCart = (item: any) => {
  gtag('event', 'add_to_cart', {
    currency: 'INR',
    value: item.saree.price * item.quantity,
    items: [{
      item_id: item.saree.id,
      item_name: item.saree.name,
      item_category: item.saree.category,
      quantity: item.quantity,
      price: item.saree.price,
    }],
  });
};

export const trackRemoveFromCart = (item: any) => {
  gtag('event', 'remove_from_cart', {
    currency: 'INR',
    value: item.saree.price * item.quantity,
    items: [{
      item_id: item.saree.id,
      item_name: item.saree.name,
      item_category: item.saree.category,
      quantity: item.quantity,
      price: item.saree.price,
    }],
  });
};

export const trackViewItem = (saree: any) => {
  gtag('event', 'view_item', {
    currency: 'INR',
    value: saree.price,
    items: [{
      item_id: saree.id,
      item_name: saree.name,
      item_category: saree.category,
      price: saree.price,
    }],
  });
};

export const trackSearch = (searchTerm: string) => {
  gtag('event', 'search', {
    search_term: searchTerm,
  });
};

export const trackBeginCheckout = (items: any[], value: number) => {
  gtag('event', 'begin_checkout', {
    currency: 'INR',
    value: value,
    items: items.map(item => ({
      item_id: item.saree.id,
      item_name: item.saree.name,
      item_category: item.saree.category,
      quantity: item.quantity,
      price: item.saree.price,
    })),
  });
};

// Custom business metrics tracking
export const trackUserEngagement = (eventName: string, parameters?: Record<string, any>) => {
  gtag('event', eventName, {
    event_category: 'engagement',
    ...parameters,
  });
};

export const trackConversion = (conversionName: string, value?: number) => {
  gtag('event', 'conversion', {
    event_category: 'conversion',
    event_label: conversionName,
    value: value,
  });
};

// Initialize analytics when the module is imported
if (typeof window !== 'undefined') {
  initGA();
}

// Type declarations for window.gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}