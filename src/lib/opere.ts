import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './i18n';

export type Opera = CollectionEntry<'opere'>;

export async function opereOrdinate(): Promise<Opera[]> {
  const tutte = await getCollection('opere', ({ data }) => data.pubblicata);
  return tutte.sort((a, b) => a.data.ordine - b.data.ordine);
}

export const titolo = (o: Opera, lang: Lang) => (lang === 'en' && o.data.en.titolo) || o.data.titolo;
export const alt = (o: Opera, lang: Lang) => (lang === 'en' && o.data.en.alt) || o.data.alt;
export const data = (o: Opera, lang: Lang) => (lang === 'en' && o.data.en.data) || o.data.data;

/** "100 × 140 cm" (altezza × base), oppure il testo per dittici e polittici, oppure null. */
export function misure(o: Opera, lang: Lang = 'it'): string | null {
  const { altezza, base, misureTesto } = o.data;
  const testo = lang === 'en' ? o.data.en.misureTesto ?? misureTesto : misureTesto;
  if (testo) return testo;
  return altezza && base ? `${altezza} × ${base} cm` : null;
}

/** "Olio su acrilico su tela" / "Oil on acrylic", oppure null. */
export function tecnica(o: Opera, lang: Lang = 'it'): string | null {
  if (lang === 'en' && o.data.en.tecnica) return o.data.en.tecnica;
  const { tecnica: t, supporto } = o.data;
  if (!t) return null;
  return supporto ? `${t} su ${supporto}` : t;
}

/** Titolo che distingue le opere omonime: "Ljubav, 60 × 50 cm". */
export function titoloEsteso(o: Opera, tutte: Opera[], lang: Lang = 'it'): string {
  const t = titolo(o, lang);
  const omonime = tutte.filter((x) => titolo(x, lang) === t).length > 1;
  const m = misure(o, lang);
  return omonime && m ? `${t}, ${m}` : t;
}
