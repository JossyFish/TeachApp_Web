'use client';

import { useState } from 'react';
import { 
  GraduationCap, 
  Star, 
  Zap, 
  Lock, 
  Unlock, 
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import styles from './login.module.css';
import { Role, ROLES } from '@/app/components/constants/roles';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import ThemeToggle from '@/app/components/ui/ThemeToggle/ThemeToggle';
import LanguageSwitcher from '@/app/components/ui/LanguageSwitcher/LanguageSwitcher';
import { useRouter } from 'next/navigation';


export default function Login() {
  const { translate } = useLanguage();
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const currentRole = ROLES[activeRole];
  const router = useRouter();

  const t = (key: string) => translate(`auth.login.${key}`);

  const handleSignupRedirect = () => {
    router.push('/modules/auth/register');
  };

  const handleBackHome = () => {
    router.push('/');
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

      {/* Right Panel - Login Form */}
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

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>{t('title')}</h1>
            <p className={styles.formSubtitle}>{t('subtitle')}</p>
          </div>

          <div className={styles.roleSection}>
            <label className={styles.roleLabel}>{t('sign_in_as')}</label>
            <div className={styles.roleButtons}>
              {(['student', 'teacher', 'admin'] as Role[]).map((role) => {
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

          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>{t('email')}</label>
              <input 
                type="email" 
                placeholder={t('email_placeholder')}
                className={styles.fieldInput} 
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <label className={styles.fieldLabel}>{t('password')}</label>
                <button className={styles.forgotLink}>{t('forgot_password')}</button>
              </div>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={t('password_placeholder')}
                  className={styles.fieldInput} 
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)} 
                  className={styles.passwordToggle}
                >
                  {showPassword ? <Unlock size={14} /> : <Lock size={14} />}
                </button>
              </div>
            </div>

            <label className={styles.rememberMe}>
              <span className={styles.checkbox}>
                <CheckCircle size={10} />
              </span>
              <span>{t('remember_me')}</span>
            </label>

            <button 
              className={styles.submitButton}
              style={{ 
                background: `linear-gradient(135deg,${currentRole.color},${currentRole.color}dd)`,
                boxShadow: `0 4px 24px ${currentRole.color}33`
              }}
            >
              {t('sign_in')}
            </button>
          </div>

          <div className={styles.divider}>
            <span>{t('or_continue_with')}</span>
          </div>

          <div className={styles.socialButtons}>
            {[{ label: "Google", abbr: "G", bg: "#ea4335" }, { label: "GitHub", abbr: "GH", bg: "#24292e" }].map(p => (
              <button key={p.label} className={styles.socialButton}>
                <span className={styles.socialIcon} style={{ background: p.bg }}>{p.abbr}</span>
                {p.label}
              </button>
            ))}
          </div>

          <p className={styles.formFooter}>
            {t('no_account')}
         <button 
              className={styles.signupLink}
              onClick={handleSignupRedirect}
            >
              {t('create_one')}
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