import BreedDetailClient from './BreedDetailClient';
import { breedIds } from '@/lib/catalog';

export const dynamicParams = false;

export async function generateStaticParams() {
  return breedIds.map((id) => ({
    id,
  }));
}

export default async function BreedDetailPage({ params }) {
  const resolvedParams = await params;

  return <BreedDetailClient id={resolvedParams.id} />;
}
