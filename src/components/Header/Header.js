'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  const { lang, toggleLang } = useLanguage();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <span className={styles.paw}>🐾</span> Catsplorer
      </Link>
      <button onClick={toggleLang} className={styles.langBtn}>
        {lang === 'en' ? '🇹🇷 TR' : '🇺🇸 EN'}
      </button>
    </header>
  );
}
