'use client';

import { useState } from 'react';
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

export default function Register() {
  const { translate } = useLanguage();
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Teacher fields
    expertise: '',
    experience: '',
    bio: '',
    pricePerHour: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    subscription: 'monthly' as 'monthly' | 'yearly',
  });
  const currentRole = ROLES[activeRole];
  const router = useRouter();

  const t = (key: string) => translate(`auth.signup.${key}`);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    router.push('/modules/auth/login');
  };

  const handleLoginRedirect = () => {
    router.push('/modules/auth/login');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  // Форматирование номера карты
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  // Форматирование срока действия
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

  return (
    <div className={styles.container}>
      {/* Desktop Controls */}
      <div className={styles.desktopControls}>
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Left Panel - Branding */}
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

      {/* Right Panel - Signup Form */}
      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          {/* Mobile Header */}
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

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={styles.stepDots}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ''}`} />
              <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ''}`} />
            </div>
            <span className={styles.stepText}>Step {step} of 2</span>
          </div>

          {/* Form Header */}
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>
              {step === 1 ? t('title_step1') : t('title_step2')}
            </h1>
            <p className={styles.formSubtitle}>
              {step === 1 ? t('subtitle_step1') : t('subtitle_step2')}
            </p>
          </div>

          {/* Role Tabs (only on step 1) */}
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

          {/* Form */}
          <form onSubmit={step === 1 ? handleNext : handleSubmit} className={styles.form}>
            {step === 1 ? (
              activeRole === 'student' ? (
                <StudentForm 
                  formData={formData}
                  activeRole={activeRole}
                  handleChange={handleChange}
                  handleNext={handleNext}
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
                activeRole={activeRole as 'student' | 'teacher'} // ← явное приведение
                setStep={setStep}
                handleChange={handleChange}
                handleCardChange={handleCardChange}
                handleExpiryChange={handleExpiryChange}
                handleSubmit={handleSubmit}
                />
            )}
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span>{t('or_signup_with')}</span>
          </div>

          {/* Social Buttons */}
          <div className={styles.socialButtons}>
            {[{ label: "Google", abbr: "G", bg: "#ea4335" }, { label: "GitHub", abbr: "GH", bg: "#24292e" }].map(p => (
              <button key={p.label} className={styles.socialButton}>
                <span className={styles.socialIcon} style={{ background: p.bg }}>{p.abbr}</span>
                {p.label}
              </button>
            ))}
          </div>

          {/* Footer */}
          <p className={styles.formFooter}>
            {t('have_account')}
            <button 
              className={styles.signupLink}
              onClick={handleLoginRedirect}
            >
              {t('sign_in')}
            </button>
          </p>
          <button 
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