'use client';
import { useLanguage } from "@/app/components/scripts/LanguageContext";
import styles from './register.module.css';
import LanguageSwitcher from "@/app/components/ui/LanguageSwitcher/LanguageSwitcher";
import ThemeToggle from "@/app/components/ui/ThemeToggle/ThemeToggle";
import { ChevronRight, GraduationCap, Star, Zap } from "lucide-react";
import { Role, ROLES } from "@/app/components/constants/roles";
import { useState } from "react";
import { RegistrationForm } from "./components/RegistrationForm";
import { PasswordStep } from "./components/PasswordStep";
import { ConfirmRegistration, CreateStudent } from "../scripts/AuthService";
import { ConfirmCodeForm } from "@/app/features/modules/ConfirmCodeForm/ConfirmCodeForm";
import { useRouter } from "next/navigation";

export default function Register() {
    const { translate } = useLanguage();
    const [activeRole, setActiveRole] = useState<Role>('student');
    const currentRole = ROLES[activeRole];
    const [step, setStep] = useState(1);
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
    const [registeredEmail, setRegisteredEmail] = useState('');
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const router = useRouter();
    
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
        if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
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

     const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = e.target.value.replace(/\D/g, '');
        const groups = cleaned.match(/.{1,4}/g);
        setFormData({ ...formData, cardNumber: groups ? groups.join(' ') : cleaned });
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cleaned = e.target.value.replace(/\D/g, '');
        const formatted = cleaned.length >= 2
        ? cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
        : cleaned;
        setFormData({ ...formData, cardExpiry: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        if (activeRole === 'student') {
            await CreateStudent(formData.firstName, formData.lastName, formData.email, formData.password);
            setRegisteredEmail(formData.email);
            setStep(3);
        }
        } catch (error) {
        console.error('Ошибка регистрации:', error);
        }
    };

    const handleLoginRedirect = () => router.push('/modules/auth/login');
    const handleBackHome = () => router.push('/');

    return(
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
                <span>{translate('auth.signup.trusted_badge')}</span>
                </div>
                <h2
                className={styles.heroTitle}
                dangerouslySetInnerHTML={{ __html: translate('auth.signup.hero_title') }}
                />
                <p className={styles.heroSubtext}>
                {translate('auth.signup.hero_subtitle')}
                </p>

                <div className={styles.testimonial}>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} />)}
                </div>
                <p className={styles.testimonialText}>
                    {translate('auth.signup.testimonial_text')}
                </p>
                <div className={styles.testimonialAuthor}>
                    <div
                    className={styles.authorAvatar}
                    style={{ background: `linear-gradient(135deg,${currentRole.color},#7c3aed)` }}
                    >
                    AJ
                    </div>
                    <div>
                    <div className={styles.authorName}>{translate('auth.signup.testimonial_name')}</div>
                    <div className={styles.authorTitle}>{translate('auth.signup.testimonial_title')}</div>
                    </div>
                </div>
                </div>
            </div>

            <div className={styles.stats}>
                {[
                ["2K+", translate('auth.signup.courses')],
                ["2.4K+", translate('auth.signup.learners')],
                ["98%", translate('auth.signup.satisfaction')]
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
          </div>

          <div className={styles.stepIndicator}>
            <div className={styles.stepDots}>
              <div className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ''}`} />
              <div className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ''}`} />
              <div className={`${styles.stepDot} ${step >= 3 ? styles.stepDotActive : ''}`} />
            </div>
            <span className={styles.stepText}>{translate('auth.signup.step')} {step} {translate('auth.signup.of')} 3</span>
          </div>

          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>
              {step === 1 && translate('auth.signup.title_step1')}
              {step === 2 && translate('auth.signup.title_step2')}
              {step === 3 && translate('auth.signup.title_confirm')}
            </h1>
            <p className={styles.formSubtitle}>
              {step === 1 && translate('auth.signup.subtitle_step1')}
              {step === 2 && translate('auth.signup.subtitle_step2')}
              {step === 3 && translate('auth.signup.subtitle_confirm')}
            </p>
          </div>

          {step === 1 && (
            <RegistrationForm
              activeRole={activeRole}
              setActiveRole={setActiveRole}
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleNext={handleNext}
            />
          )}

          {step === 2 && (
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

          {step === 3 && (
             <ConfirmCodeForm
                email={registeredEmail}
                role={activeRole as 'student' | 'teacher'}
                confirmRegistration={async (code: string) => {
                await ConfirmRegistration(registeredEmail, code);
                }}
                onSuccess={() => router.push('/dashboard')}
                onBack={() => setStep(2)}
            />
          )}

          <p className={styles.formFooter}>
            {translate('auth.signup.have_account')}
            <button type="button" className={styles.signupLink} onClick={handleLoginRedirect}>
              {translate('auth.signup.sign_in')}
            </button>
          </p>
          <button type="button" className={styles.backLink} onClick={handleBackHome}>
            <ChevronRight size={12} />
                {translate('auth.signup.back_home')}
          </button>
        </div>
      </div>

        </div>
    );
}

