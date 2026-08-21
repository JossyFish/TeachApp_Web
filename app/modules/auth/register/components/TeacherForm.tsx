'use client';

import { 
  Briefcase, 
  Clock, 
  FileText, 
  UserCircle,
  Mail,
  User
} from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';

interface TeacherFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    expertise: string;
    experience: string;
    bio: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNext: (e: React.FormEvent) => void;
}

export function TeacherForm({ formData, handleChange, handleNext }: TeacherFormProps) {
  const { translate } = useLanguage();
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

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('expertise')}</label>
        <div className={styles.inputWrapper}>
          <Briefcase size={16} className={styles.inputIcon} />
          <select
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            className={styles.fieldInput}
            required
          >
            <option value="">{t('expertise_placeholder')}</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="data_science">Data Science</option>
            <option value="business">Business</option>
            <option value="ai_ml">AI & ML</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('experience')}</label>
        <div className={styles.inputWrapper}>
          <Clock size={16} className={styles.inputIcon} />
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className={styles.fieldInput}
            required
          >
            <option value="">{t('experience_placeholder')}</option>
            <option value="0-1">0-1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel}>{t('bio')}</label>
        <div className={styles.inputWrapper}>
          <FileText size={16} className={styles.inputIcon} />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder={t('bio_placeholder')}
            className={styles.fieldInput}
            rows={3}
            required
          />
        </div>
      </div>

      <button 
        type="submit"
        className={styles.submitButton}
        style={{ 
          background: `linear-gradient(135deg,#8b5cf6,#7c3aed)`,
          boxShadow: `0 4px 24px #8b5cf633`
        }}
        onClick={handleNext}
      >
        {t('continue')} →
      </button>
    </>
  );
}