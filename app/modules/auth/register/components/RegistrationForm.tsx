'use client';

import { Role, ROLES } from '@/app/components/constants/roles';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from '../register.module.css';
import { StudentForm } from './StudentForm';
import { TeacherForm } from './TeacherForm';


interface RegistrationFormProps {
  activeRole: Role;
  setActiveRole: (role: Role) => void;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    expertise: string;
    experience: string;
    bio: string;
    cardNumber: string;
    cardExpiry: string;
    cardCvc: string;
    subscription: 'monthly' | 'yearly';
  };
  errors: { firstName?: boolean; lastName?: boolean; email?: boolean };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNext: (e: React.FormEvent) => void;
  onGoogleClick?: () => void;
  onGitHubClick?: () => void;
}

export function RegistrationForm({activeRole, setActiveRole, formData, errors, handleChange, handleNext, onGoogleClick, onGitHubClick, }: RegistrationFormProps) {
  const { translate } = useLanguage();
  const t = (key: string) => translate(`auth.signup.${key}`);

   return (
    <>
      <div className={styles.roleSection}>
        <label className={styles.roleLabel}>{t('sign_up_as')}</label>
        <div className={styles.roleButtons}>
          {(['student', 'teacher'] as Role[]).map((role) => {
            const config = ROLES[role];
            const isActive = activeRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setActiveRole(role)}
                className={`${styles.roleButton} ${isActive ? styles.roleButtonActive : ''}`}
                style={isActive ? {
                  background: `${config.color}18`,
                  borderColor: config.color,
                  color: config.color,
                } : {}}
              >
                <config.Icon size={15} />
                {translate(config.translationKey)}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleNext} className={styles.form} noValidate>
        {activeRole === 'student' ? (
          <StudentForm
            formData={formData}
            activeRole={activeRole}
            handleChange={handleChange}
            handleNext={handleNext}
            errors={errors}
          />
        ) : (
          <TeacherForm
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        )}
      </form>

      <div className={styles.divider}>
        <span>{t('or_signup_with')}</span>
      </div>

      <div className={styles.socialButtons}>
        <button type="button" className={styles.socialButton} onClick={onGoogleClick}>
          <span className={styles.socialIcon} style={{ background: '#ea4335' }}>G</span>
          Google
        </button>
        <button type="button" className={styles.socialButton} onClick={onGitHubClick}>
          <span className={styles.socialIcon} style={{ background: '#24292e' }}>GH</span>
          GitHub
        </button>
      </div>
    </>
  );
}