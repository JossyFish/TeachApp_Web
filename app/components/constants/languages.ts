export const LANGUAGES = [
  {
    code: 'ru',
    name: 'Русский',
    nativeName: 'Русский',
    flag: '🇷🇺',
    file: () => import('@/src/locales/ru.json')
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    file: () => import('@/src/locales/en.json')
  }
];

export type LanguageCode = typeof LANGUAGES[number]['code'];

export const LANGUAGE_MAP = Object.fromEntries(
  LANGUAGES.map(lang => [lang.code, lang])
) as Record<LanguageCode, typeof LANGUAGES[number]>;