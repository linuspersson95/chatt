import axios from 'axios';
import 'dotenv/config';
import type { SupportedLanguages } from '@chatt/types';

const DEEPL_URL = process.env.DEEPL_URL;
const DEEPL_KEY = process.env.DEEPL_KEY;

export async function translateText(
  text: string,
  targetLang: SupportedLanguages,
  sourceLang: SupportedLanguages,
): Promise<string> {
  if (!DEEPL_KEY) throw new Error('Missing DeepL API key');

  const params = new URLSearchParams();
  params.append('auth_key', DEEPL_KEY);
  params.append('text', text);
  params.append('target_lang', targetLang.toUpperCase());
  params.append('source_lang', sourceLang.toUpperCase());

  try {
    const response = await axios.post(DEEPL_URL, params);
    const translations = response.data.translations;
    if (translations && translations.length > 0) {
      return translations[0].text;
    }
    throw new Error('No translation returned');
  } catch (error) {
    console.error('DeepL translation error:', error);
    throw error;
  }
}
