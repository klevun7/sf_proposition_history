// i18n/i18n.js
'use client'; // This can stay, but the critical part is how it's imported

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/public/locales/en/common.json';
import es from '@/public/locales/es/common.json';
import zh from '@/public/locales/zh/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      resources: {
        en: { translation: en },
        es: { translation: es },
        zh: { translation: zh },
      },
      interpolation: {
        escapeValue: false,
      },
    });
}
// >>>>>> IMPORTANT: NO `export default i18n;` HERE! <<<<<<