// Lingue del sito: italiano (principale, alla radice) e inglese (sotto /en/).
import { url } from './url';
import sito from '../data/sito.json';

export type Lang = 'it' | 'en';
export const LINGUE: Lang[] = ['it', 'en'];

export type Pagina = 'home' | 'opere' | 'opera' | 'artista' | 'allestimenti' | 'contatti';

const PERCORSI: Record<Lang, Record<Exclude<Pagina, 'opera'>, string>> = {
  it: { home: '', opere: 'opere/', artista: 'artista/', allestimenti: 'allestimenti/', contatti: 'contatti/' },
  en: { home: 'en/', opere: 'en/works/', artista: 'en/artist/', allestimenti: 'en/exhibitions/', contatti: 'en/contact/' },
};

/** Indirizzo di una pagina nella lingua scelta. Per una singola opera passare l'id. */
export function percorso(lang: Lang, pagina: Pagina, id?: string): string {
  if (pagina === 'opera') return url(`${PERCORSI[lang].opere}${id}/`);
  return url(PERCORSI[lang][pagina]);
}

export const T = {
  it: {
    menu: { home: 'Home', opere: 'Opere', artista: 'Artista', allestimenti: 'Allestimenti', contatti: 'Contatti' },
    altraLingua: 'English version', altraLinguaBreve: 'EN', menuPrincipale: 'Menu principale', paginaIniziale: 'pagina iniziale',
    lartista: 'L’Artista', ilProgetto: 'Il progetto:', fotoArtista: 'Foto dell’artista', attivoA: 'attivo a', anni: ' anni',
    guardaOpere: (n: number) => `Guarda le ${n} opere`, vediAllestimenti: 'Vedi gli allestimenti',
    opereTitolo: 'Opere', opereSottotitolo: (n: number) => `${n} opere, mostrate in proporzione alle misure reali.`,
    filtra: 'Filtra per serie', tutte: 'Tutte',
    tecnica: 'Tecnica', misure: 'Misure', data: 'Data', serie: 'Serie', dettagli: 'Dettagli',
    precedente: 'Opera precedente', successiva: 'Opera successiva', tutteOpere: 'Tutte le opere', altreOpere: 'Altre opere',
    operaDi: 'Opera di', inStudio: 'In studio', allestimentiTitolo: 'Allestimenti',
    contattiTitolo: 'Contatti', contattiTesto: 'Per informazioni sulle opere, mostre e collaborazioni, scrivi qui: il messaggio arriva direttamente all’artista.',
    campoNome: 'Nome e cognome', campoEmail: 'La tua email', campoMessaggio: 'Messaggio', invia: 'Invia il messaggio', invio: 'Invio in corso…',
    inviato: 'Grazie, il messaggio è stato inviato. Riceverai risposta all’indirizzo indicato.', errore: 'Il messaggio non è partito. Riprova tra qualche minuto.',
    consenso: 'Acconsento all’uso dei miei dati solo per ricevere una risposta a questo messaggio.',
    notaPrivacy: 'I dati inviati servono soltanto a rispondere al messaggio e vengono inoltrati via email tramite il servizio Web3Forms. Non vengono usati per altri scopi né ceduti a terzi.',
    moduloInAttivazione: 'Il modulo è in fase di attivazione: sarà disponibile a breve.',
    nonTrovata: 'Questa pagina non esiste', nonTrovataTesto: 'L’indirizzo potrebbe essere cambiato. Da qui puoi',
    vediTutte: 'vedere tutte le opere', o: 'o', tornaInizio: 'tornare all’inizio', paginaNonTrovata: 'Pagina non trovata',
    ritrattoAlt: 'Ritratto dell’artista nel suo studio di avvocato',
  },
  en: {
    menu: { home: 'Home', opere: 'Works', artista: 'Artist', allestimenti: 'Exhibitions', contatti: 'Contact' },
    altraLingua: 'Versione italiana', altraLinguaBreve: 'IT', menuPrincipale: 'Main menu', paginaIniziale: 'home page',
    lartista: 'The Artist', ilProgetto: 'The project:', fotoArtista: 'Photo of the artist', attivoA: 'based in', anni: '',
    guardaOpere: (n: number) => `See all ${n} works`, vediAllestimenti: 'See the exhibitions',
    opereTitolo: 'Works', opereSottotitolo: (n: number) => `${n} works, shown in proportion to their real size.`,
    filtra: 'Filter by series', tutte: 'All',
    tecnica: 'Medium', misure: 'Dimensions', data: 'Date', serie: 'Series', dettagli: 'Details',
    precedente: 'Previous work', successiva: 'Next work', tutteOpere: 'All works', altreOpere: 'Other works',
    operaDi: 'A work by', inStudio: 'In the studio', allestimentiTitolo: 'Exhibitions',
    contattiTitolo: 'Contact', contattiTesto: 'For information about the works, exhibitions and collaborations, write here: your message goes straight to the artist.',
    campoNome: 'Full name', campoEmail: 'Your email', campoMessaggio: 'Message', invia: 'Send message', invio: 'Sending…',
    inviato: 'Thank you, your message has been sent. You will receive a reply at the address you gave.', errore: 'The message could not be sent. Please try again in a few minutes.',
    consenso: 'I agree to my data being used only to reply to this message.',
    notaPrivacy: 'Your details are used only to reply to your message and are forwarded by email through the Web3Forms service. They are not used for any other purpose or shared with third parties.',
    moduloInAttivazione: 'The form is being activated and will be available soon.',
    nonTrovata: 'This page does not exist', nonTrovataTesto: 'The address may have changed. From here you can',
    vediTutte: 'see all the works', o: 'or', tornaInizio: 'go back to the start', paginaNonTrovata: 'Page not found',
    ritrattoAlt: 'Portrait of the artist in his law office',
  },
} as const;

/** Testi del sito (sito.json) nella lingua scelta. */
export function testiSito(lang: Lang) {
  const en = sito.en;
  return {
    descrizione: lang === 'en' ? en.descrizione : sito.descrizione,
    visione: lang === 'en' ? en.visione : sito.visione,
    presentazione: lang === 'en' ? en.artista.presentazione : sito.artista.presentazione,
    luogo: lang === 'en' ? en.artista.luogo : sito.artista.luogo,
    progetti: sito.progetti.map((p) => ({
      id: p.id,
      titolo: lang === 'en' ? (en.progetti as Record<string, { titolo: string; introduzione: string }>)[p.id]?.titolo ?? p.titolo : p.titolo,
      introduzione: lang === 'en' ? (en.progetti as Record<string, { titolo: string; introduzione: string }>)[p.id]?.introduzione ?? '' : p.introduzione,
    })),
  };
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** Trasforma un testo semplice in HTML: paragrafi separati da riga vuota, "## " per i titoletti, *corsivo*. */
export function testoHtml(testo = ''): string {
  return testo
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      const riga = esc(b).replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/\n/g, '<br />');
      return b.startsWith('## ') ? `<h2>${riga.slice(3)}</h2>` : `<p>${riga}</p>`;
    })
    .join('');
}
