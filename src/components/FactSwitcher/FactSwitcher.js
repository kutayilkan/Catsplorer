'use client';

import { useState, useEffect } from 'react';
import styles from './FactSwitcher.module.css';
import { useLanguage } from '@/context/LanguageContext';

export default function FactSwitcher({ inline = false }) {
  const { lang, t } = useLanguage();
  const [facts, setFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingFacts, setLoadingFacts] = useState(true);

  useEffect(() => {
    const fetchFacts = async () => {
      setLoadingFacts(true);
      try {
        const res = await fetch(`/api/facts?lang=${lang}`);
        const data = await res.json();
        setFacts(data);
      } catch (error) {
        console.error("Failed to fetch facts:", error);
      }
      setLoadingFacts(false);
    };
    fetchFacts();
  }, [lang]);

  const nextFact = () => {
    if (facts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    if (facts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  if (loadingFacts && facts.length === 0) {
    return <div className={`${styles.loadingCard} ${inline ? styles.inlineCard : ''}`}>{t('loading')}...</div>;
  }
  if (facts.length === 0) return null;

  return (
    <div className={`${styles.factCard} ${inline ? styles.inlineCard : ''}`}>
      <div className={styles.cardHeader}>
        <span className={styles.sparkle}>✨</span>
        <h3 className={styles.title}>{t('knowledgeBox')}</h3>
      </div>
      
      <div className={styles.content}>
        <p className={styles.factText}>{facts[currentIndex]}</p>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={prevFact} 
          className={styles.controlBtn} 
          title={t('prevFact')}
        >
          <span className={styles.arrow}>←</span>
        </button>
        <div className={styles.counterWrapper}>
          <span className={styles.current}>{currentIndex + 1}</span>
          <span className={styles.divider}>/</span>
          <span className={styles.total}>{facts.length}</span>
        </div>
        <button 
          onClick={nextFact} 
          className={styles.controlBtn}
          title={t('nextFact')}
        >
          <span className={styles.arrow}>→</span>
        </button>
      </div>
    </div>
  );
}
