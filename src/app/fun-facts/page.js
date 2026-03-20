'use client';

import Header from '@/components/Header/Header';
import ExplorerNav from '@/components/ExplorerNav/ExplorerNav';
import FactSwitcher from '@/components/FactSwitcher/FactSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function FunFactsPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.pageSection}>
        <div className={styles.layout}>
          <ExplorerNav activePath="/fun-facts" />

          <div className={styles.mainContent}>
            <div className={styles.header}>
              <p className={styles.eyebrow}>{t('knowledgeBox')}</p>
              <h1 className={styles.title}>{t('funFacts')}</h1>
              <p className={styles.description}>{t('heroDesc')}</p>
            </div>

            <div className={styles.cardWrap}>
              <FactSwitcher inline />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
