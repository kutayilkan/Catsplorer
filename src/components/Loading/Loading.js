'use client';

import Image from 'next/image';
import styles from './Loading.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function Loading() {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageContainer}>
          <Image 
            src="/cat-loading.png" 
            alt="Cat playing with yarn" 
            width={200} 
            height={200}
            className={styles.cat}
          />
          <div className={styles.yarnShadow}></div>
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.text}>{t('loadingCats')}</h2>
          <div className={styles.dots}>
            <span>.</span><span>.</span><span>.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
