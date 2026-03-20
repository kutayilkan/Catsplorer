'use client';

import { createContext, useContext, useState } from 'react';
import { translations } from '@/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') {
      return 'en';
    }

    return localStorage.getItem('app-lang') || 'en';
  });

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'tr' : 'en';
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
