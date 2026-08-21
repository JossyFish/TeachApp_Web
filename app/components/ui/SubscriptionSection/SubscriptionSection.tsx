'use client';

import { Crown } from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from './subscriptionSection.module.css';
import { SUBSCRIPTION_PLANS, SubscriptionType } from '../../constants/plans';

interface SubscriptionSectionProps {
  subscription: SubscriptionType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SubscriptionSection({ subscription, onChange }: SubscriptionSectionProps) {
  const { translate } = useLanguage();
  const t = (key: string) => translate(`auth.signup.${key}`);

  return (
    <div className={styles.subscriptionSection}>
      <div className={styles.subscriptionHeader}>
        <Crown size={18} />
        <span>{t('subscription_plan')}</span>
      </div>

      <div className={styles.subscriptionOptions}>
        {SUBSCRIPTION_PLANS.map((plan) => {
          const Icon = plan.icon;
          const isActive = subscription === plan.id;
          const name = t(plan.name);
          const desc = t(plan.desc);
          const badge = plan.badge ? t(plan.badge) : null;

          return (
            <label 
              key={plan.id}
              className={`${styles.subscriptionOption} ${isActive ? styles.subscriptionOptionActive : ''}`}
              style={isActive ? { borderColor: plan.color } : {}}
            >
              <input
                type="radio"
                name="subscription"
                value={plan.id}
                checked={isActive}
                onChange={onChange}
              />
              <div className={styles.subscriptionOptionContent}>
                <div className={styles.subscriptionOptionHeader}>
                  <div className={styles.subscriptionOptionIcon} style={{ color: plan.color }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className={styles.subscriptionName}>{name}</div>
                    <div className={styles.subscriptionPrice}>{plan.price}</div>
                  </div>
                  {badge && (
                    <span className={styles.subscriptionBadge} style={{ background: plan.color }}>
                      {badge}
                    </span>
                  )}
                </div>
                <div className={styles.subscriptionDesc}>{desc}</div>
              </div>
            </label>
          );
        })}
      </div>

      <div className={styles.subscriptionTotal}>
        <span>{t('total_due')}</span>
        <span className={styles.subscriptionTotalPrice}>
          {subscription === 'monthly' && '$29.99'}
          {subscription === 'yearly' && '$299.99'}
          {subscription === 'vip' && '$499.99'}
          <span className={styles.subscriptionTotalPeriod}>
            /{subscription === 'monthly' ? t('month') : t('year')}
          </span>
        </span>
      </div>
    </div>
  );
}