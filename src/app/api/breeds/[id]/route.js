import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';

  try {
    const dataPath = path.join(process.cwd(), `src/data/breeds_${lang}.json`);
    let finalPath = dataPath;
    if (!fs.existsSync(dataPath)) {
        finalPath = path.join(process.cwd(), `src/data/breeds_en.json`);
    }

    if (!fs.existsSync(finalPath)) {
        throw new Error("Data not synced yet");
    }

    const fileContent = fs.readFileSync(finalPath, 'utf8');
    const allBreeds = JSON.parse(fileContent);

    const breed = allBreeds.find(b => b.id.toLowerCase() === id.toLowerCase());

    if (!breed) {
      return NextResponse.json({ error: "Breed not found" }, { status: 404 });
    }

    // Ensure images array exists for the gallery
    const responseData = { ...breed };
    if (!responseData.images) {
      responseData.images = breed.image?.url ? [breed.image.url] : ["/cat-mascot.png"];
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(`Local Detail API Error for ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
