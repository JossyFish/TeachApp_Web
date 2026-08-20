'use client';

import { UserCircle, User, Mail } from 'lucide-react';
import { Role, ROLES } from '@/app/components/constants/roles';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';

interface StudentFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  activeRole: Role;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNext: (e: React.FormEvent) => void;
}

export function StudentForm({ formData, activeRole, handleChange, handleNext }: StudentFormProps) {
  const { translate } = useLanguage();
  const currentRole = ROLES[activeRole];
  const t = (key: string) => translate(`auth.signup.${key}`);

  return (
    <>
      <div className={styles.formRow}>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('first_name')}</label>
          <div className={styles.inputWrapper}>
            <UserCircle size={16} className={styles.inputIcon} />
            <input 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={t('first_name_placeholder')}
              className={styles.fieldInput} 
              required
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>{t('last_name')}</label>
          <div className={styles.inputWrapper}>
            <User size={16} className={styles.inputIcon} />
            <input 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={t('last_name_placeholder')}
              className={styles.fieldInput} 
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('email')}</label>
        <div className={styles.inputWrapper}>
          <Mail size={16} className={styles.inputIcon} />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('email_placeholder')}
            className={styles.fieldInput} 
            required
          />
        </div>
      </div>

      <button 
        type="submit"
        className={styles.submitButton}
        style={{ 
          background: `linear-gradient(135deg,${currentRole.color},${currentRole.color}dd)`,
          boxShadow: `0 4px 24px ${currentRole.color}33`
        }}
        onClick={handleNext}
      >
        {t('continue')} →
      </button>
    </>
  );
}