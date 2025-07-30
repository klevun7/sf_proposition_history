
'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="mb-3">
      <button className={`btn btn-light me-2 ${i18n.language === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>🇺🇸 English</button>
      <button className={`btn btn-light me-2 ${i18n.language === 'es' ? 'active' : ''}`} onClick={() => changeLanguage('es')}>🇪🇸 Español</button>
      <button className={`btn btn-light ${i18n.language === 'zh' ? 'active' : ''}`} onClick={() => changeLanguage('zh')}>🇨🇳 中文</button>
    </div>
  );
}