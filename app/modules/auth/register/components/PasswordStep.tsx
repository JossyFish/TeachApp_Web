'use client';

import { useState, useMemo } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';
import { SubscriptionSection } from '@/app/components/ui/SubscriptionSection/SubscriptionSection';
import { PaymentSection } from '@/app/components/ui/PaymentSection/PaymentSection';
import { getPasswordStrength } from '@/app/components/scripts/NumberProcessor';

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
  const [agreeToTerms, setAgreeToTerms] = useState(false);   // ← новое
  const t = (key: string) => translate(`auth.signup.${key}`);

  const strength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  // Условия для активации кнопки
  const isSubmitDisabled =
    !agreeToTerms ||
    !passwordsMatch ||
    strength.score < 2;

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
            <div 
              className={styles.strengthFill} 
              style={{ 
                width: `${strength.width}%`,
                background: strength.color,
                transition: 'width 0.3s ease, background 0.3s ease'
              }} 
            />
          </div>
          <span 
            className={styles.strengthText}
            style={{ color: strength.color }}
          >
            {t(strength.label)}
          </span>
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
          {passwordsMatch && (
            <CheckCircle size={14} className={styles.inputCheck} />
          )}
        </div>
      </div>

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

      {/* Реальный checkbox */}
      <div className={styles.terms}>
        <label className={styles.termsLabel}>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className={styles.checkboxInput}
            required
          />
          <span className={styles.checkbox}>
            {agreeToTerms}
          </span>
          <span>{t('terms_text')}</span>
        </label>
      </div>

      <button 
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitDisabled}
        style={{ 
          background: `linear-gradient(135deg,${activeRole === 'teacher' ? '#8b5cf6' : '#2563eb'},${activeRole === 'teacher' ? '#7c3aed' : '#1d4ed8'})`,
          boxShadow: `0 4px 24px ${activeRole === 'teacher' ? '#8b5cf633' : '#2563eb33'}`,
          opacity: isSubmitDisabled ? 0.5 : 1,
          cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
        }}
        onClick={handleSubmit}
      >
        {activeRole === 'teacher' ? t('create_account_and_pay') : t('create_account')} 
      </button>
    </>
  );
}