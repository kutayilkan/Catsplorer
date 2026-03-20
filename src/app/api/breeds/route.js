import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getOriginCode } from '@/lib/originFlags';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '9');
  const page = parseInt(searchParams.get('page') || '0');
  const lang = searchParams.get('lang') || 'en';
  const query = (searchParams.get('query') || '').trim().toLowerCase();
  const origin = (searchParams.get('origin') || '').trim().toUpperCase();

  try {
    const dataPath = path.join(process.cwd(), `src/data/breeds_${lang}.json`);
    
    // Fallback to EN if TR doesn't exist yet
    let finalPath = dataPath;
    if (!fs.existsSync(dataPath)) {
        finalPath = path.join(process.cwd(), `src/data/breeds_en.json`);
    }

    if (!fs.existsSync(finalPath)) {
        return NextResponse.json({ error: "Data not synced yet" }, { status: 503 });
    }

    const fileContent = fs.readFileSync(finalPath, 'utf8');
    const allBreeds = JSON.parse(fileContent);

    const filteredBreeds = allBreeds.filter((breed) => {
      const matchesQuery =
        !query ||
        breed.name?.toLowerCase().includes(query) ||
        breed.temperament?.toLowerCase().includes(query);
      const matchesOrigin =
        !origin || getOriginCode(breed.origin) === origin || breed.country_code?.toUpperCase() === origin;

      return matchesQuery && matchesOrigin;
    });

    const origins = [...new Map(
      allBreeds
        .filter((breed) => breed.origin)
        .map((breed) => {
          const code = getOriginCode(breed.origin) || breed.country_code?.toUpperCase() || breed.country_codes?.toUpperCase();
          return [code, { code, label: breed.origin }];
        })
        .filter(([code]) => code)
    ).values()].sort((a, b) => a.label.localeCompare(b.label));

    // Apply pagination
    const start = page * limit;
    const end = start + limit;
    const paginatedBreeds = filteredBreeds.slice(start, end);

    return NextResponse.json({
      items: paginatedBreeds,
      total: filteredBreeds.length,
      origins,
    });
  } catch (error) {
    console.error("Local API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
