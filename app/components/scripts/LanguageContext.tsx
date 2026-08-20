'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LANGUAGE_MAP, LanguageCode, LANGUAGES } from '../constants/languages';

// Позволяет вложенную структуру
type TranslationRecord = Record<string, unknown>;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translate: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Функция для получения вложенного значения по ключу с точками
const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return '';
    }
  }
  
  return typeof current === 'string' ? current : '';
};

const loadTranslations = async (lang: LanguageCode): Promise<TranslationRecord> => {
  try {
    const languageConfig = LANGUAGE_MAP[lang];
    
    if (!languageConfig) {
      console.warn(`Language ${lang} not supported, falling back to ru`);
      const fallback = await LANGUAGES[0].file();
      return (fallback.default || fallback) as TranslationRecord;
    }
    
    const module = await languageConfig.file();
    return (module.default || module) as TranslationRecord;
  } catch (error) {
    console.error(`Failed to load ${lang} translations:`, error);
    return {} as TranslationRecord;
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('ru');
  const [translations, setTranslations] = useState<TranslationRecord>({});

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageCode;
    if (savedLang && LANGUAGE_MAP[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    loadTranslations(language).then(setTranslations);
    document.documentElement.lang = language;
  }, [language]);

  const translate = (key: string, params?: Record<string, string | number>): string => {
    let text = getNestedValue(translations, key) || `[${key}]`;
    
    if (params) {
      Object.keys(params).forEach(paramKey => {
        text = text.replace(`{{${paramKey}}}`, String(params[paramKey]));
      });
    }
    
    return text;
  };

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      translate 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}