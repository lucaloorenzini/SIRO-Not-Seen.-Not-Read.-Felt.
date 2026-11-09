// Struttura dei contenuti. Ogni testo ha la versione italiana e, nel blocco `en:`, quella inglese.
// Opere: un file .md per opera in src/content/opere/ (testo sotto i trattini = didascalia estesa in italiano).
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const SERIE = {
  felt: { it: 'Not seen, not read, felt', en: 'Not seen, not read, felt' },
  'dont-judge': { it: 'Don’t judge', en: 'Don’t judge' },
  money: { it: 'Money', en: 'Money' },
  ljubav: { it: 'Ljubav', en: 'Ljubav' },
  'parole-e-potere': { it: 'Parole e potere', en: 'Words and power' },
  'griglie-di-lettere': { it: 'Griglie di lettere', en: 'Letter grids' },
  wool: { it: 'Wool', en: 'Wool' },
  art: { it: 'Art', en: 'Art' },
  'altre-opere': { it: 'Altre opere', en: 'Other works' },
  'su-richiesta': { it: 'Custom work', en: 'Custom work' },
} as const;
export type Serie = keyof typeof SERIE;

const opere = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opere' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      serie: z.enum(Object.keys(SERIE) as [Serie, ...Serie[]]),
      ordine: z.number(),
      immagine: image(),
      alt: z.string(),
      tecnica: z.string().optional(),
      supporto: z.string().optional(),
      altezza: z.number().optional(), // cm
      base: z.number().optional(), // cm
      // testo libero per dittici e polittici; se presente sostituisce altezza × base nella didascalia
      misureTesto: z.string().optional(),
      data: z.string().optional(),
      dettagli: z.array(z.object({ immagine: image(), alt: z.string() })).optional(),
      pubblicata: z.boolean().default(true),
      note: z.string().optional(), // note interne, non compaiono sul sito
      en: z
        .object({
          titolo: z.string().optional(), // solo se diverso dall'italiano
          alt: z.string().optional(),
          tecnica: z.string().optional(),
          misureTesto: z.string().optional(),
          data: z.string().optional(),
          didascalia: z.string().optional(), // didascalia estesa in inglese
          dettagli: z.array(z.string()).optional(), // testi alternativi delle foto di dettaglio
        })
        .default({}),
    }),
});

const testoEn = z.object({ titolo: z.string().optional(), alt: z.string().optional(), testo: z.string().optional(), sottotitolo: z.string().optional() }).default({});

const allestimenti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/allestimenti' }),
  schema: ({ image }) => z.object({ titolo: z.string(), ordine: z.number(), immagine: image(), alt: z.string(), en: testoEn }),
});

const pagine = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pagine' }),
  schema: z.object({ titolo: z.string(), sottotitolo: z.string().optional(), en: testoEn }),
});

// Capitoli dei progetti in Home: testo dell'artista + opere abbinate.
const capitoli = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/capitoli' }),
  schema: z.object({
    titolo: z.string(),
    progetto: z.string().default('not-seen'), // id del progetto in src/data/sito.json
    ordine: z.number(),
    // colore della parete della sala: bianco, giallo, rosso, verde, azzurro, blu, fucsia, nero
    parete: z.enum(['bianco', 'giallo', 'rosso', 'verde', 'azzurro', 'blu', 'fucsia', 'nero']).default('bianco'),
    opere: z.array(reference('opere')).default([]),
    en: testoEn,
  }),
});

export const collections = { opere, allestimenti, pagine, capitoli };
