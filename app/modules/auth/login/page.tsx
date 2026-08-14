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
import { ROLES, type Role } from './roles';
import styles from './page.module.css';

export default function Login() {
  const [activeRole, setActiveRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const currentRole = ROLES[activeRole];

  return (
    <div className={styles.container}>
      {/* Left Panel - Branding */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <GraduationCap size={18} />
            </div>
            <span className={styles.logoText}>LearnFlow</span>
          </div>

          {/* Hero */}
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
              <span>Trusted by 2.4 million learners</span>
            </div>
            <h2 className={styles.heroTitle}>
              Your learning<br />journey continues<br />
              <span 
                className={styles.heroHighlight}
                style={{ 
                  background: `linear-gradient(135deg,${currentRole.color},#a78bfa)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                right here.
              </span>
            </h2>
            <p className={styles.heroSubtext}>
              Access 12,000+ courses from world-class instructors — available anytime, anywhere.
            </p>

            {/* Testimonial */}
            <div className={styles.testimonial}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => <Star key={i} size={12} />)}
              </div>
              <p className={styles.testimonialText}>
                "LearnFlow transformed my career. I went from junior dev to senior engineer in 18 months."
              </p>
              <div className={styles.testimonialAuthor}>
                <div 
                  className={styles.authorAvatar}
                  style={{ background: `linear-gradient(135deg,${currentRole.color},#7c3aed)` }}
                >
                  AJ
                </div>
                <div>
                  <div className={styles.authorName}>Alex Johnson</div>
                  <div className={styles.authorTitle}>Senior Engineer at Stripe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {[["12K+", "Courses"], ["2.4M+", "Learners"], ["98%", "Satisfaction"]].map(([v, l]) => (
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
          {/* Mobile logo */}
          <div className={styles.mobileLogo}>
            <div className={styles.logoIconSmall}>
              <GraduationCap size={16} />
            </div>
            <span className={styles.logoTextSmall}>LearnFlow</span>
          </div>

          {/* Form Header */}
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Welcome back</h1>
            <p className={styles.formSubtitle}>Sign in to continue your learning journey</p>
          </div>

          {/* Role Tabs */}
          <div className={styles.roleSection}>
            <label className={styles.roleLabel}>Sign in as</label>
            <div className={styles.roleButtons}>
              {(['student', 'teacher', 'admin'] as Role[]).map((role) => {
                const config = ROLES[role];
                const isActive = activeRole === role;

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
                    {config.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className={styles.form}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className={styles.fieldInput} 
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldHeader}>
                <label className={styles.fieldLabel}>Password</label>
                <button className={styles.forgotLink}>Forgot password?</button>
              </div>
              <div className={styles.passwordWrapper}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
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
              <span>Remember me for 30 days</span>
            </label>

            <button 
              className={styles.submitButton}
              style={{ 
                background: `linear-gradient(135deg,${currentRole.color},${currentRole.color}dd)`,
                boxShadow: `0 4px 24px ${currentRole.color}33`
              }}
            >
              Sign In →
            </button>
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <span>or continue with</span>
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
            {"Don't have an account? "}
            <button className={styles.signupLink}>Create one free</button>
          </p>
          <button className={styles.backLink}>
            <ChevronRight size={12} />
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}