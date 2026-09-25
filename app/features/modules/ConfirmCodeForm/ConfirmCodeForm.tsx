'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useLanguage } from '@/app/components/scripts/LanguageContext';
import styles from './confirmCode.module.css';

interface ConfirmCodeFormProps {
  email: string;
  role: 'student' | 'teacher';
  confirmRegistration: (code: string) => Promise<void>;
  onSuccess: () => void;
  onBack: () => void;
}

const CODE_LENGTH = 6;

export function ConfirmCodeForm({email, role, confirmRegistration, onSuccess, onBack }: ConfirmCodeFormProps) {
  const { translate } = useLanguage();
  const t = (key: string) => translate(`auth.signup.${key}`);

  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const code = useMemo(() => digits.join(''), [digits]);
  const isComplete = code.length === CODE_LENGTH && /^\d{6}$/.test(code);

  useEffect(() => {
    if (!isComplete || isPending || success) return;

    const submit = async () => {
      setIsPending(true);
      setError(null);
      try {
        await confirmRegistration(code);
        setSuccess(true);
        setTimeout(() => onSuccess(), 600);
      } catch (e: any) {
        setError(e?.message ?? t('confirm_error'));
        setDigits(Array(CODE_LENGTH).fill(''));
        inputsRef.current[0]?.focus();
      } finally {
        setIsPending(false);
      }
    };

    submit();
  }, [isComplete]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    if (!digit && value !== '') return;

    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    setError(null);

    if (digit && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (!pasted) return;

    const next = Array(CODE_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);

    const lastIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    inputsRef.current[lastIndex]?.focus();
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={onBack} className={styles.backButton}>
        <ArrowLeft size={14} />
        {t('back')}
      </button>

      <div className={styles.header}>
        <h2 className={styles.title}>{t('confirm_email_title')}</h2>
        <p className={styles.subtitle}>
          {t('confirm_email_subtitle')}{' '}
          <span className={styles.email}>{email}</span>
        </p>
        <span className={styles.role}>
          {role === 'student' ? t('student') : t('teacher')}
        </span>
      </div>

      <div className={styles.inputs}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputsRef.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={isPending || success}
            className={`${styles.input} ${digit ? styles.filled : ''}`}
            autoFocus={index === 0}
          />
        ))}
      </div>

      {isPending && (
        <div className={`${styles.status} ${styles.statusLoading}`}>
          <Loader2 size={16} className={styles.spinner} />
          {t('confirm_checking')}
        </div>
      )}

      {error && (
        <div className={`${styles.status} ${styles.statusError}`}>
          {error}
        </div>
      )}

      {success && (
        <div className={`${styles.status} ${styles.statusSuccess}`}>
          <CheckCircle size={16} />
          {t('confirm_success')}
        </div>
      )}
    </div>
  );
}