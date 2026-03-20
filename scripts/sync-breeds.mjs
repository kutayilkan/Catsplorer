import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { translate } from '@vitalets/google-translate-api';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CAT_API_KEY = 'live_N61mb0SOjNR2AicGlOWkzi2IGIZEVx81wu1izLEfFALim7JHiLHxvnZmhi0UfAXN';
const CAT_API_URL = 'https://api.thecatapi.com/v1';

async function translateText(text, targetLang = 'tr') {
  if (!text || targetLang === 'en') return text;
  try {
    const { text: translated } = await translate(text, { to: targetLang });
    return translated;
  } catch (error) {
    console.error(`Translation failed for: ${text.substring(0, 20)}... Error:`, error.message);
    return text;
  }
}

async function sync() {
  console.log('🚀 Starting Breed Synchronization...');
  
  try {
    // 1. Fetch all breeds
    const res = await fetch(`${CAT_API_URL}/breeds`, {
      headers: { 'x-api-key': CAT_API_KEY }
    });
    const breeds = await res.json();
    console.log(`📦 Fetched ${breeds.length} breeds.`);

    const breeds_en = [];
    const breeds_tr = [];

    for (const breed of breeds) {
      console.log(`🐱 Processing: ${breed.name}...`);
      
      // Fetch primary image if not present (Cat API /breeds usually has image object)
      let imageUrl = breed.image?.url;
      if (!imageUrl) {
        const imgRes = await fetch(`${CAT_API_URL}/images/search?breed_ids=${breed.id}&limit=1`, {
          headers: { 'x-api-key': CAT_API_KEY }
        });
        const imgs = await imgRes.json();
        imageUrl = imgs[0]?.url || '/cat-mascot.png';
      }

      const baseBreed = {
        ...breed,
        image: { url: imageUrl }
      };

      // EN version
      breeds_en.push(baseBreed);

      // TR version (Translate)
      const trBreed = { ...baseBreed };
      trBreed.description = await translateText(breed.description, 'tr');
      trBreed.temperament = await translateText(breed.temperament, 'tr');
      
      // Manual name overrides or translate
      if (breed.name.toLowerCase() === 'abyssinian') trBreed.name = 'Habeş Kedisi';
      else if (breed.name.toLowerCase() === 'aegean') trBreed.name = 'Ege Kedisi';
      else trBreed.name = await translateText(breed.name, 'tr');

      breeds_tr.push(trBreed);
      
      // Small delay to avoid rate limits
      await new Promise(r => setTimeout(r, 200));
    }

    // Save files
    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    fs.writeFileSync(path.join(dataDir, 'breeds_en.json'), JSON.stringify(breeds_en, null, 2));
    fs.writeFileSync(path.join(dataDir, 'breeds_tr.json'), JSON.stringify(breeds_tr, null, 2));

    console.log('✅ Synchronization complete! Files saved to src/data/');
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

sync();
