'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header/Header';
import styles from './page.module.css';

export default function HomePage() {
  const { t } = useLanguage();

  const pawPositions = [
    { top: '10%', left: '5%', rotate: -15, delay: '0s' },
    { top: '25%', right: '8%', rotate: 20, delay: '1s' },
    { bottom: '15%', left: '12%', rotate: 10, delay: '2s' },
    { bottom: '30%', right: '5%', rotate: -25, delay: '3.5s' },
    { top: '50%', left: '2%', rotate: -5, delay: '2.5s' },
    { top: '15%', right: '25%', rotate: 35, delay: '4s' },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.backgroundPatterns}>
        {pawPositions.map((pos, i) => (
          <div
            key={i}
            className={styles.floatingPaw}
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: `rotate(${pos.rotate}deg)`,
              animationDelay: pos.delay,
            }}
          >
            🐾
          </div>
        ))}
      </div>

      <section className={styles.heroSection}>
        <main className={styles.main}>
          <div className={styles.heroImage}>
            <Image
              src="/cat-mascot.png"
              alt="Cute Cat Mascot"
              width={250}
              height={250}
              priority
              className={styles.mascot}
            />
          </div>
          <h1 className={styles.title}>{t('heroTitle')}</h1>
          <p className={styles.description}>{t('heroDesc')}</p>
          <div className={styles.ctaContainer}>
            <a href="/breeds" className={styles.primaryBtn}>
              {t('startExploring')}
            </a>
          </div>
        </main>
      </section>
    </div>
  );
}
