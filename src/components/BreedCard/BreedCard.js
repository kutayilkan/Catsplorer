import Image from "next/image";
import styles from "./BreedCard.module.css";
import { useLanguage } from "@/context/LanguageContext";
import { getOriginFlag } from "@/lib/originFlags";

import Link from "next/link";

export default function BreedCard({ breed, currentPage, queryString }) {
  const { t } = useLanguage();
  const href = queryString
    ? `/breed/${breed.id}?${queryString}`
    : `/breed/${breed.id}?page=${currentPage}`;

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={breed.image?.url || "/cat-mascot.png"}
          alt={breed.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.info}>
        <div className={styles.headerRow}>
          <h3 className={styles.name}>{breed.name}</h3>
          <span className={styles.originFlag} title={breed.origin} aria-label={breed.origin}>
            {getOriginFlag(breed.origin)}
          </span>
        </div>
        <p className={styles.temperament}>{breed.temperament}</p>
        <span className={styles.detailsBtn}>{t('viewDetails')}</span>
      </div>
    </Link>
  );
}
