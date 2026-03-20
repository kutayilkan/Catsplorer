'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/components/Header/Header';
import Loading from '@/components/Loading/Loading';
import { useLanguage } from '@/context/LanguageContext';

export default function BreedDetails() {
  const params = useParams();
  const id = params?.id;
  const { lang, t } = useLanguage();
  const [breed, setBreed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/breeds/${id}?lang=${lang}`);
        const data = await res.json();
        setBreed(data);
      } catch (error) {
        console.error("Failed to fetch breed details:", error);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id, lang]);

  if (loading) return (
    <div className={styles.loadingContainer}>
      <Header />
      <Loading />
    </div>
  );

  if (!breed) return <div className={styles.container}><Header /><div className={styles.main}>Breed not found.</div></div>;

  const backQuery = new URLSearchParams(window.location.search).toString();
  const backHref = backQuery ? `/breeds?${backQuery}` : '/breeds';

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.explorerLayout}>
          <div className={styles.mainContent}>
            <Link href={backHref} className={styles.backBtn}>
              ← {t('backToList')}
            </Link>

            <section className={styles.hero}>
              <div className={styles.gallery}>
                {breed.images?.slice(0, 3).map((url, i) => (
                  <div key={i} className={styles.mainImgWrapper}>
                    <Image src={url} alt={breed.name} fill className={styles.galleryImg} />
                  </div>
                ))}
                {(!breed.images || breed.images.length === 0) && (
                  <div className={styles.mainImgWrapper}>
                    <Image src="/cat-mascot.png" alt={breed.name} fill className={styles.galleryImg} />
                  </div>
                )}
              </div>
              
              <div className={styles.content}>
                <h1 className={styles.name}>{breed.name}</h1>
                <p className={styles.description}>{breed.description}</p>
                
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <strong>{t('temperament')}:</strong> <span>{breed.temperament}</span>
                  </div>
                  <div className={styles.statItem}>
                    <strong>{t('origin')}:</strong> <span>{breed.origin}</span>
                  </div>
                  <div className={styles.statItem}>
                    <strong>{t('lifeSpan')}:</strong> <span>{breed.life_span} years</span>
                  </div>
                  <div className={styles.statItem}>
                    <strong>{t('weight')}:</strong> <span>{breed.weight?.metric} kg</span>
                  </div>
                </div>

                {breed.wikipedia_url ? (
                  <a
                    href={breed.wikipedia_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.wikipediaLink}
                  >
                    <span className={styles.wikipediaLabel}>{t('wikipedia')}</span>
                    <span>{t('readMore')}</span>
                  </a>
                ) : null}
              </div>
            </section>

            <section className={styles.funFacts}>
              <h2 className={styles.sectionTitle}>🐾 {t('breedCharacteristics')}</h2>
              <div className={styles.factsList}>
                <div className={styles.factCard}>
                  <strong>{lang === 'tr' ? 'Zeka' : 'Intelligence'}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.intelligence || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{lang === 'tr' ? 'Şefkat' : 'Affection'}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.affection_level || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{lang === 'tr' ? 'Çocuk Dostu' : 'Child Friendly'}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.child_friendly || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{lang === 'tr' ? 'Enerji' : 'Energy'}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.energy_level || 0) * 20}%` }}></div></div>
                </div>
                {/* Added interesting new traits */}
                <div className={styles.factCard}>
                  <strong>{t('adaptability')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.adaptability || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('dogFriendly')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.dog_friendly || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('strangerFriendly')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.stranger_friendly || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('socialNeeds')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.social_needs || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('grooming')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.grooming || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('healthIssues')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.health_issues || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('sheddingLevel')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.shedding_level || 0) * 20}%` }}></div></div>
                </div>
                <div className={styles.factCard}>
                  <strong>{t('hypoallergenic')}</strong> 
                  <div className={styles.barContainer}><div className={styles.bar} style={{ width: `${(breed.hypoallergenic || 0) * 20}%` }}></div></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
