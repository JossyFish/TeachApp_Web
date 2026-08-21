'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LANGUAGE_MAP, LanguageCode, LANGUAGES } from '../constants/languages';

// Тип для вложенных переводов
type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

type TranslationRecord = NestedTranslation;

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  translate: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Кеш переводов
let translationsCache: Record<LanguageCode, TranslationRecord> = {} as Record<LanguageCode, TranslationRecord>;

// Функция для получения вложенного значения по ключу с точками
const getNestedValue = (obj: TranslationRecord, path: string): string => {
  const keys = path.split('.');
  let current: any = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return '';
    }
  }
  
  return typeof current === 'string' ? current : '';
};

const loadTranslations = async (lang: LanguageCode): Promise<TranslationRecord> => {
  try {
    if (translationsCache[lang]) {
      return translationsCache[lang];
    }

    const languageConfig = LANGUAGE_MAP[lang];
    
    if (!languageConfig) {
      console.warn(`Language ${lang} not supported, falling back to ru`);
      const fallback = await LANGUAGES[0].file();
      const data = (fallback.default || fallback) as TranslationRecord;
      translationsCache[lang] = data;
      return data;
    }
    
    const module = await languageConfig.file();
    const data = (module.default || module) as TranslationRecord;
    translationsCache[lang] = data;
    return data;
  } catch (error) {
    console.error(`Failed to load ${lang} translations:`, error);
    return {} as TranslationRecord;
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>('ru');
  const [translations, setTranslations] = useState<TranslationRecord>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as LanguageCode;
    if (savedLang && LANGUAGE_MAP[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    loadTranslations(language).then((data) => {
      setTranslations(data);
      setIsLoaded(true);
    });
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