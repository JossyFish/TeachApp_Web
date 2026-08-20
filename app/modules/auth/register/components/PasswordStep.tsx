'use client';

import { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Calendar,
  Shield,
  Crown,
} from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';

interface PasswordStepProps {
  formData: {
    password: string;
    confirmPassword: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    subscription: 'monthly' | 'yearly';
  };
  activeRole: 'student' | 'teacher'; // ← только student или teacher
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
                  value={formData.cardNumber}
                  onChange={handleCardChange}
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
                    value={formData.cardExpiry}
                    onChange={handleExpiryChange}
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
                    value={formData.cardCvc}
                    onChange={handleChange}
                    placeholder="•••"
                    className={styles.fieldInput} 
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.subscriptionSection}>
            <div className={styles.subscriptionHeader}>
              <Crown size={18} />
              <span>{t('subscription_plan')}</span>
            </div>

            <div className={styles.subscriptionOptions}>
              <label className={`${styles.subscriptionOption} ${formData.subscription === 'monthly' ? styles.subscriptionOptionActive : ''}`}>
                <input
                  type="radio"
                  name="subscription"
                  value="monthly"
                  checked={formData.subscription === 'monthly'}
                  onChange={handleChange}
                />
                <div>
                  <div className={styles.subscriptionName}>{t('monthly')}</div>
                  <div className={styles.subscriptionPrice}>$29.99</div>
                  <div className={styles.subscriptionDesc}>{t('monthly_desc')}</div>
                </div>
              </label>

              <label className={`${styles.subscriptionOption} ${formData.subscription === 'yearly' ? styles.subscriptionOptionActive : ''}`}>
                <input
                  type="radio"
                  name="subscription"
                  value="yearly"
                  checked={formData.subscription === 'yearly'}
                  onChange={handleChange}
                />
                <div>
                  <div className={styles.subscriptionName}>{t('yearly')}</div>
                  <div className={styles.subscriptionPrice}>$299.99</div>
                  <div className={styles.subscriptionDesc}>{t('yearly_desc')}</div>
                  <div className={styles.subscriptionBadge}>{t('save_60')}</div>
                </div>
              </label>
            </div>

            <div className={styles.subscriptionTotal}>
              <span>{t('total_due')}</span>
              <span className={styles.subscriptionTotalPrice}>
                {formData.subscription === 'monthly' ? '$29.99' : '$299.99'}
                <span className={styles.subscriptionTotalPeriod}>
                  /{formData.subscription === 'monthly' ? t('month') : t('year')}
                </span>
              </span>
            </div>
          </div>
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