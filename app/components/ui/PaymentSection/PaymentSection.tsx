'use client';

import { CreditCard, Calendar, Shield } from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from './paymentSection.module.css';

interface PaymentSectionProps {
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  onCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCvcChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PaymentSection({ 
  cardNumber, 
  cardExpiry, 
  cardCvc, 
  onCardChange, 
  onExpiryChange, 
  onCvcChange 
}: PaymentSectionProps) {
  const { translate } = useLanguage();
  const t = (key: string) => translate(`auth.signup.${key}`);

  return (
    <div className={styles.paymentSection}>
      <div className={styles.paymentHeader}>
        <CreditCard size={18} />
        <span>{t('payment_details')}</span>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('card_number')}</label>
        <div className={styles.inputWrapper}>
          <CreditCard size={16} className={styles.inputIcon} />
          <input 
            type="text" 
            name="cardNumber"
            value={cardNumber}
            onChange={onCardChange}
            placeholder="1234 5678 9012 3456"
            className={styles.fieldInput} 
            maxLength={19}
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('card_expiry')}</label>
          <div className={styles.inputWrapper}>
            <Calendar size={16} className={styles.inputIcon} />
            <input 
              type="text" 
              name="cardExpiry"
              value={cardExpiry}
              onChange={onExpiryChange}
              placeholder="MM/YY"
              className={styles.fieldInput} 
              maxLength={5}
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('card_cvc')}</label>
          <div className={styles.inputWrapper}>
            <Shield size={16} className={styles.inputIcon} />
            <input 
              type="password" 
              name="cardCvc"
              value={cardCvc}
              onChange={onCvcChange}
              placeholder="•••"
              className={styles.fieldInput} 
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}