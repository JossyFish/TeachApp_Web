'use client';

import { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';
import { SubscriptionSection } from '@/app/components/ui/SubscriptionSection/SubscriptionSection';
import { PaymentSection } from '@/app/components/ui/PaymentSection/PaymentSection';

interface PasswordStepProps {
  formData: {
    password: string;
    confirmPassword: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    subscription: 'monthly' | 'yearly' | 'vip';
  };
  activeRole: 'student' | 'teacher'; 
  setStep: (step: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleCardChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function PasswordStep({ 
  formData, 
  activeRole, 
  setStep, 
  handleChange, 
  handleCardChange,
  handleExpiryChange,
  handleSubmit 
}: PasswordStepProps) {
  const { translate } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const t = (key: string) => translate(`auth.signup.${key}`);

  return (
    <>
      <button 
        type="button"
        onClick={() => setStep(1)}
        className={styles.backButton}
      >
        <ArrowLeft size={14} />
        {t('back')}
      </button>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('password')}</label>
        <div className={styles.passwordWrapper}>
          <Lock size={16} className={styles.inputIcon} />
          <input 
            type={showPassword ? "text" : "password"} 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t('password_placeholder')}
            className={styles.fieldInput} 
            required
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)} 
            className={styles.passwordToggle}
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div className={styles.passwordStrength}>
          <div className={styles.strengthBar}>
            <div className={styles.strengthFill} style={{ width: '70%' }} />
          </div>
          <span className={styles.strengthText}>{t('password_strong')}</span>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('confirm_password')}</label>
        <div className={styles.passwordWrapper}>
          <Lock size={16} className={styles.inputIcon} />
          <input 
            type={showPassword ? "text" : "password"} 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={t('confirm_password_placeholder')}
            className={styles.fieldInput} 
            required
          />
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <CheckCircle size={14} className={styles.inputCheck} />
          )}
        </div>
      </div>

      {/* Teacher Payment Section */}
      {activeRole === 'teacher' && (
        <>
          <PaymentSection 
            cardNumber={formData.cardNumber}
            cardExpiry={formData.cardExpiry}
            cardCvc={formData.cardCvc}
            onCardChange={handleCardChange}
            onExpiryChange={handleExpiryChange}
            onCvcChange={handleChange}
          />
          <SubscriptionSection 
            subscription={formData.subscription}
            onChange={handleChange}
          />
        </>
      )}

      <div className={styles.terms}>
        <label className={styles.termsLabel}>
          <span className={styles.checkbox}>
            <CheckCircle size={10} />
          </span>
          <span>{t('terms_text')}</span>
        </label>
      </div>

      <button 
        type="submit"
        className={styles.submitButton}
        style={{ 
          background: `linear-gradient(135deg,${activeRole === 'teacher' ? '#8b5cf6' : '#2563eb'},${activeRole === 'teacher' ? '#7c3aed' : '#1d4ed8'})`,
          boxShadow: `0 4px 24px ${activeRole === 'teacher' ? '#8b5cf633' : '#2563eb33'}`
        }}
        onClick={handleSubmit}
      >
        {activeRole === 'teacher' ? t('create_account_and_pay') : t('create_account')} ✓
      </button>
    </>
  );
}