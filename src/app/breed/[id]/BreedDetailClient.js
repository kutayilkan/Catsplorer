'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import { useLanguage } from '@/context/LanguageContext';
import { getBreedById } from '@/lib/catalog';
import styles from './page.module.css';

export default function BreedDetailClient({ id }) {
  const { lang, t } = useLanguage();
  const breed = getBreedById(id, lang);

  if (!breed) {
    return <div className={styles.container}><Header /><div className={styles.main}>Breed not found.</div></div>;
  }

  const images = breed.images?.length
    ? breed.images
    : breed.image?.url
      ? [breed.image.url]
      : ['/cat-mascot.png'];

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.explorerLayout}>
          <div className={styles.mainContent}>
            <Link href="/breeds" className={styles.backBtn}>
              ← {t('backToList')}
            </Link>

            <section className={styles.hero}>
              <div className={styles.gallery}>
                {images.slice(0, 3).map((url, i) => (
                  <div key={i} className={styles.mainImgWrapper}>
                    <Image src={url} alt={breed.name} fill className={styles.galleryImg} />
                  </div>
                ))}
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
