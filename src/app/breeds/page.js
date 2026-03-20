'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import ExplorerNav from '@/components/ExplorerNav/ExplorerNav';
import BreedCard from '@/components/BreedCard/BreedCard';
import Pagination from '@/components/Pagination/Pagination';
import Loading from '@/components/Loading/Loading';
import { useLanguage } from '@/context/LanguageContext';
import { getFlagFromCode } from '@/lib/originFlags';
import styles from './page.module.css';

function getInitialState() {
  if (typeof window === 'undefined') {
    return { page: 0, searchQuery: '', originFilter: '' };
  }

  const params = new URLSearchParams(window.location.search);
  const parsedPage = Number.parseInt(params.get('page') || '0', 10);

  return {
    page: Number.isNaN(parsedPage) ? 0 : parsedPage,
    searchQuery: params.get('query') || '',
    originFilter: params.get('origin') || '',
  };
}

export default function BreedsPage() {
  const initialState = getInitialState();
  const { lang, t } = useLanguage();
  const [breeds, setBreeds] = useState([]);
  const [total, setTotal] = useState(0);
  const [origins, setOrigins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialState.page);
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);
  const [originFilter, setOriginFilter] = useState(initialState.originFilter);
  const limit = 9;

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: String(limit),
          page: String(page),
          lang,
        });
        if (searchQuery) params.set('query', searchQuery);
        if (originFilter) params.set('origin', originFilter);

        const res = await fetch(`/api/breeds?${params.toString()}`);
        const data = await res.json();
        setBreeds(data.items || []);
        setTotal(data.total || 0);
        setOrigins(data.origins || []);
      } catch (error) {
        console.error('Failed to fetch breeds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();

    const url = new URL(window.location.href);
    url.searchParams.set('page', String(page));
    if (searchQuery) {
      url.searchParams.set('query', searchQuery);
    } else {
      url.searchParams.delete('query');
    }
    if (originFilter) {
      url.searchParams.set('origin', originFilter);
    } else {
      url.searchParams.delete('origin');
    }
    window.history.replaceState({}, '', url.toString());
  }, [lang, originFilter, page, searchQuery]);

  const totalPages = Math.ceil(total / limit);
  const activeQueryString = new URLSearchParams(
    Object.entries({
      page: String(page),
      ...(searchQuery ? { query: searchQuery } : {}),
      ...(originFilter ? { origin: originFilter } : {}),
    })
  ).toString();

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.pageSection}>
        <div className={styles.layout}>
          <ExplorerNav activePath="/breeds" />

          <div className={styles.mainContent}>
            <div className={styles.header}>
              <div>
                <h1 className={styles.title}>{t('heroTitle')}</h1>
                <p className={styles.resultMeta}>
                  {total} {t('resultsFound')}
                </p>
              </div>
            </div>

            <div className={styles.filterBar}>
              <label className={styles.filterField}>
                <span className={styles.filterLabel}>{t('searchBreeds')}</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0);
                  }}
                  placeholder={t('searchPlaceholder')}
                  className={styles.searchInput}
                />
              </label>

              <label className={styles.filterField}>
                <span className={styles.filterLabel}>{t('filterOrigin')}</span>
                <select
                  value={originFilter}
                  onChange={(e) => {
                    setOriginFilter(e.target.value);
                    setPage(0);
                  }}
                  className={styles.selectInput}
                >
                  <option value="">{t('allOrigins')}</option>
                  {origins.map((origin) => (
                    <option key={origin.code} value={origin.code}>
                      {`${getFlagFromCode(origin.code)} ${origin.label}`}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  setSearchQuery('');
                  setOriginFilter('');
                  setPage(0);
                }}
                disabled={!searchQuery && !originFilter}
              >
                {t('clearFilters')}
              </button>
            </div>

            <div className={styles.grid}>
              {loading ? (
                <Loading />
              ) : breeds.length === 0 ? (
                <div className={styles.emptyState}>{t('noBreedsFound')}</div>
              ) : (
                breeds.map((breed) => (
                  <BreedCard
                    key={breed.id}
                    breed={breed}
                    currentPage={page}
                    queryString={activeQueryString}
                  />
                ))
              )}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(nextPage) => setPage(nextPage)}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
