'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Pagination.module.css';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const { t } = useLanguage();

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button 
        className={styles.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <span className={styles.arrow} aria-hidden="true">←</span>
        <span>{t('previous')}</span>
      </button>
      <div className={styles.info}>
        <span className={styles.infoLabel}>{t('page')}</span>
        <span className={styles.infoValue}>
          {currentPage + 1}
          <span className={styles.infoDivider}>/</span>
          {totalPages}
        </span>
      </div>
      <button 
        className={styles.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        <span>{t('next')}</span>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </button>
    </div>
  );
}
