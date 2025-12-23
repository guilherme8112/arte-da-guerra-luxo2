
import React from 'react';

export interface Edition {
  id: string;
  title: string;
  price: number;
  benefits: string[];
  isPremium: boolean;
  tag?: string;
  checkoutUrl: string;
}

export interface ProductDetail {
  /* Fix: Added React import to define the React namespace for ReactNode */
  icon: React.ReactNode;
  title: string;
  description: string;
}
