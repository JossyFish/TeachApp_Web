import { Crown, Star } from 'lucide-react';

export interface Plan {
  id: 'monthly' | 'yearly' | 'vip';
  icon: React.ElementType;
  name: string;
  price: string;
  desc: string;
  badge: string | null;
  color: string;
}

export const SUBSCRIPTION_PLANS: Plan[] = [
  {
    id: 'monthly',
    icon: Crown,
    name: 'monthly',
    price: '$29.99',
    desc: 'monthly_desc',
    badge: null,
    color: '#2563eb',
  },
  {
    id: 'yearly',
    icon: Crown,
    name: 'yearly',
    price: '$299.99',
    desc: 'yearly_desc',
    badge: 'save_60',
    color: '#8b5cf6',
  },
  {
    id: 'vip',
    icon: Star,
    name: 'vip',
    price: '$499.99',
    desc: 'vip_desc',
    badge: 'vip_badge',
    color: '#f59e0b',
  },
];

export type SubscriptionType = 'monthly' | 'yearly' | 'vip';