'use client';

import Link from 'next/link';
import styles from './ExplorerNav.module.css';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { href: '/breeds', key: 'listSection', icon: '▦' },
  { href: '/fun-facts', key: 'funFacts', icon: '✦' },
];

export default function ExplorerNav({ activePath }) {
  const { t } = useLanguage();

  return (
    <aside className={styles.sideMenu}>
      <div className={styles.sideMenuCard}>
        <p className={styles.sideMenuTitle}>{t('sections')}</p>
        {navItems.map((item) => {
          const isActive = activePath === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.sideMenuLink} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.sideMenuIcon} aria-hidden="true">{item.icon}</span>
              <span className={styles.sideMenuText}>{t(item.key)}</span>
              <span className={styles.sideMenuChevron} aria-hidden="true">›</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
