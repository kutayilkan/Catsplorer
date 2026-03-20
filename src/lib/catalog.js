import breedsEn from '@/data/breeds_en.json';
import breedsTr from '@/data/breeds_tr.json';
import factsEn from '@/data/facts_en.json';
import factsTr from '@/data/facts_tr.json';
import { getOriginCode } from '@/lib/originFlags';

export function getBreeds(lang = 'en') {
  return lang === 'tr' ? breedsTr : breedsEn;
}

export function getBreedById(id, lang = 'en') {
  return getBreeds(lang).find((breed) => breed.id.toLowerCase() === id.toLowerCase()) || null;
}

export function getFacts(lang = 'en') {
  return lang === 'tr' ? factsTr : factsEn;
}

export function getOriginOptions(lang = 'en') {
  return [...new Map(
    getBreeds(lang)
      .filter((breed) => breed.origin)
      .map((breed) => {
        const code = getOriginCode(breed.origin) || breed.country_code?.toUpperCase() || breed.country_codes?.toUpperCase();
        return [code, { code, label: breed.origin }];
      })
      .filter(([code]) => code)
  ).values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function filterBreeds({ breeds, query = '', originCode = '' }) {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedOrigin = originCode.trim().toUpperCase();

  return breeds.filter((breed) => {
    const matchesQuery =
      !normalizedQuery ||
      breed.name?.toLowerCase().includes(normalizedQuery) ||
      breed.temperament?.toLowerCase().includes(normalizedQuery);
    const matchesOrigin =
      !normalizedOrigin ||
      getOriginCode(breed.origin) === normalizedOrigin ||
      breed.country_code?.toUpperCase() === normalizedOrigin;

    return matchesQuery && matchesOrigin;
  });
}

export const breedIds = breedsEn.map((breed) => breed.id);
