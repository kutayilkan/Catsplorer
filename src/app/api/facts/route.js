import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang') || 'en';
  
  const filePath = path.join(process.cwd(), `src/data/facts_${lang}.json`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const facts = JSON.parse(fileContent);
    return Response.json(facts);
  } catch (error) {
    return Response.json({ error: "Facts not found" }, { status: 404 });
  }
}
