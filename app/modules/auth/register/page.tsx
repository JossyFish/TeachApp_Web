'use client';

import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Star,
  Zap,
  ChevronRight,
} from 'lucide-react';
import styles from './register.module.css';
import { Role, ROLES } from '@/app/components/constants/roles';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import ThemeToggle from '@/app/components/ui/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/app/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useRouter } from 'next/navigation';
import { StudentForm } from './components/StudentForm';
import { TeacherForm } from './components/TeacherForm';
import { PasswordStep } from './components/PasswordStep';
import { CreateStudent, ConfirmRegistration } from '../scripts/AuthService';
import { ConfirmCodeForm } from '@/app/features/modules/ConfirmCodeForm/ConfirmCodeForm';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const { translate } = useLanguage();
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [step, setStep] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [errors, setErrors] = useState<{ firstName?: boolean; lastName?: boolean; email?: boolean }>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    expertise: '',
    experience: '',
    bio: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    subscription: 'monthly' as 'monthly' | 'yearly',
  });
  const currentRole = ROLES[activeRole];
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const t = (key: string) => translate(`auth.signup.${key}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validateStep1 = () => {
    const newErrors: typeof errors = {};

    if (activeRole === 'student') {
      if (!formData.firstName.trim()) newErrors.firstName = true;
      if (!formData.lastName.trim()) newErrors.lastName = true;

      if (!formData.email.trim()) {
        newErrors.email = true;
      } else if (!EMAIL_REGEX.test(formData.email.trim())) {
        newErrors.email = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (activeRole === 'student') {
        await CreateStudent(
          formData.firstName,
          formData.lastName,
          formData.email,
          formData.password
        );
        setRegisteredEmail(formData.email);
        setStep(3);
      }
      // teacher — своя логика (оплата и т.д.)
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/modules/auth/login');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setFormData({ ...formData, cardExpiry: formatted });
  };

  if (!isMounted) {
    return (
      <div className={styles.container}>
        <div className={styles.formPanel}>
          <div className={styles.formWrapper}>
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.desktopControls}>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <GraduationCap size={18} />
            </div>
            <span className={styles.logoText}>LearnFlow</span>
          </div>

          <div className={styles.hero}>
            <div
              className={styles.badge}
              style={{
                background: `${currentRole.color}15`,
                borderColor: `${currentRole.color}30`,
                color: currentRole.color
              }}
            >
              <Zap size={11} />
              <span>{t('trusted_badge')}</span>
            </div>
            <h2
              className={styles.heroTitle}
              dangerouslySetInnerHTML={{ __html: t('hero_title') }}
            />
            <p className={styles.heroSubtext}>
              {t('hero_subtitle')}
            </p>

            <div className={styles.testimonial}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} />)}
              </div>
              <p className={styles.testimonialText}>
                {t('testimonial_text')}
              </p>
              <div className={styles.testimonialAuthor}>
                <div
                  className={styles.authorAvatar}
                  style={{ background: `linear-gradient(135deg,${currentRole.color},#7c3aed)` }}
                >
                  AJ
                </div>
                <div>
                  <div className={styles.authorName}>{t('testimonial_name')}</div>
                  <div className={styles.authorTitle}>{t('testimonial_title')}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            {[
              ["2K+", t('courses')],
              ["2.4K+", t('learners')],
              ["98%", t('satisfaction')]
            ].map(([v, l]) => (
              <div key={l}>
                <div className={styles.statValue}>{v}</div>
                <div className={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.mobileHeader}>
            <div className={styles.mobileLogo}>
              <div className={styles.logoIconSmall}>
                <GraduationCap size={16} />
              </div>
              <span className={styles.logoTextSmall}>LearnFlow</span>
            </div>
            <div className={styles.mobileControls}>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>

          <div className={styles.stepIndicator}>
            <div className={styles.stepDots}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ''}`} />
              <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ''}`} />
              <div className={`${styles.stepDot} ${step >= 3 ? styles.stepDotActive : ''}`} />
            </div>
            <span className={styles.stepText}>Step {step} of 3</span>
          </div>

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>
              {step === 1
                ? t('title_step1')
                : step === 2
                  ? t('title_step2')
                  : t('title_confirm')}
            </h1>
            <p className={styles.formSubtitle}>
              {step === 1
                ? t('subtitle_step1')
                : step === 2
                  ? t('subtitle_step2')
                  : t('subtitle_confirm')}
            </p>
          </div>

          {step === 1 && (
            <div className={styles.roleSection}>
              <label className={styles.roleLabel}>{t('sign_up_as')}</label>
              <div className={styles.roleButtons}>
                {(['student', 'teacher'] as Role[]).map((role) => {
                  const config = ROLES[role];
                  const isActive = activeRole === role;
                  const roleLabel = translate(config.translationKey);

                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setActiveRole(role)}
                      className={`${styles.roleButton} ${isActive ? styles.roleButtonActive : ''}`}
                      style={isActive ? {
                        background: `${config.color}18`,
                        borderColor: config.color,
                        color: config.color
                      } : {}}
                    >
                      <config.Icon size={15} />
                      {roleLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 ? (
            <ConfirmCodeForm
              email={registeredEmail}
              role={activeRole as 'student' | 'teacher'}
              confirmRegistration={async (code: string) => {
                await ConfirmRegistration({
                  email: registeredEmail,
                  confirmationCode: code,
                });
              }}
              onSuccess={() => router.push('/dashboard')}
              onBack={() => setStep(2)}
            />
          ) : (
            <form onSubmit={step === 1 ? handleNext : handleSubmit} className={styles.form} noValidate>
              {step === 1 ? (
                activeRole === 'student' ? (
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
                )
              ) : (
                <PasswordStep
                  formData={formData}
                  activeRole={activeRole as 'student' | 'teacher'}
                  setStep={setStep}
                  handleChange={handleChange}
                  handleCardChange={handleCardChange}
                  handleExpiryChange={handleExpiryChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </form>
          )}

          {step === 1 && (
            <>
              <div className={styles.divider}>
                <span>{t('or_signup_with')}</span>
              </div>

              <div className={styles.socialButtons}>
                {[{ label: "Google", abbr: "G", bg: "#ea4335" }, { label: "GitHub", abbr: "GH", bg: "#24292e" }].map(p => (
                  <button key={p.label} type="button" className={styles.socialButton}>
                    <span className={styles.socialIcon} style={{ background: p.bg }}>{p.abbr}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <p className={styles.formFooter}>
            {t('have_account')}
            <button
              type="button"
              className={styles.signupLink}
              onClick={handleLoginRedirect}
            >
              {t('sign_in')}
            </button>
          </p>
          <button
            type="button"
            className={styles.backLink}
            onClick={handleBackHome}
          >
            <ChevronRight size={12} />
            {t('back_home')}
          </button>
        </div>
      </div>
    </div>
  );
}