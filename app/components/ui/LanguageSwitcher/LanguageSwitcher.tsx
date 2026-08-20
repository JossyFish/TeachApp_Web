'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import styles from './languageSwitcher.module.css';
import { useLanguage } from '../../scripts/LanguageContext';
import { LanguageCode, LANGUAGES } from '../../constants/languages';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = LANGUAGES.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className={styles.triggerText}>
          {currentLanguage?.flag} {currentLanguage?.nativeName}
        </span>
        <ChevronDown 
          size={16} 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {LANGUAGES.map((lang) => {
            const isActive = language === lang.code;
            return (
              <button
                key={lang.code}
                className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                onClick={() => handleSelect(lang.code)}
              >
                <span className={styles.optionFlag}>{lang.flag}</span>
                <span className={styles.optionName}>{lang.nativeName}</span>
                <span className={styles.optionCode}>{lang.code.toUpperCase()}</span>
                {isActive && <Check size={16} className={styles.optionCheck} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}