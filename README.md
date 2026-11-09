# Sito di Siro

Sito bilingue: italiano alla radice (`/`), inglese sotto `/en/`. Ogni testo ha la versione italiana e, nel blocco `en:`, quella inglese; se l'inglese manca, compare l'italiano.

Sito vetrina statico (Astro), pubblicato gratuitamente su GitHub Pages.
Ogni modifica salvata sul ramo `main` ripubblica il sito da sola in 1-2 minuti.

## Dove sono le cose

| Cosa | Dove |
|---|---|
| Le opere (una scheda per file) | `src/content/opere/*.md` |
| Le foto delle opere | `src/assets/opere/` |
| Le foto di allestimento | `src/content/allestimenti/` e `src/assets/allestimenti/` |
| Biografia (italiano nel corpo, inglese in `en.testo`) | `src/content/pagine/artista.md` |
| Ritratto e foto in studio | `src/assets/artista/` |
| Testi dell'interfaccia (menu, etichette) in due lingue | `src/lib/i18n.ts` |
| Nome, presentazione e dati dell’artista (nome completo, data di nascita, luogo), titolo del progetto, email, Instagram, opera in apertura | `src/data/sito.json` |
| Capitoli del testo in Home, con le opere abbinate (campo `progetto`) | `src/content/capitoli/*.md` |
| Progetti mostrati in Home (titolo e introduzione) | `src/data/sito.json`, voce `progetti` |
| Colori e caratteri | `src/styles/global.css` |
| Pubblicazione automatica | `.github/workflows/pubblica.yml` |

## Aggiungere un'opera

1. Carica la foto in `src/assets/opere/`, con un nome semplice: `nome-opera.jpg` (minuscole, trattini, niente spazi né accenti). Basta una versione di buona qualità: Astro crea da solo le versioni leggere per il web.
2. Copia una scheda esistente in `src/content/opere/` e rinominala con lo stesso nome della foto (`nome-opera.md`). Il nome del file diventa l'indirizzo della pagina.
3. Aggiorna i campi (italiano in alto, inglese nel blocco `en:`):

```yaml
---
titolo: "Titolo dell'opera"
serie: money            # felt, dont-judge, money, ljubav, parole-e-potere, griglie-di-lettere, wool, art, altre-opere
ordine: 26              # posizione nella galleria (ammessi anche decimali, es. 15.5)
immagine: ../../assets/opere/nome-opera.jpg
alt: "Descrizione per chi non vede l'immagine: colori e parole dipinte."
tecnica: "Acrilico"
altezza: 70             # cm
base: 50                # cm
misureTesto: "Dittico, due tele da 40 × 60 cm"   # facoltativo: per dittici e polittici
data: "Ottobre 2026"
pubblicata: true        # false = la scheda resta nell'archivio ma non va online
note: "Promemoria interni, non compaiono sul sito"
en:
  titolo: "Title"       # solo se diverso dall'italiano
  alt: "Description for people who cannot see the image."
  tecnica: "Acrylic"
  data: "October 2026"
  didascalia: |
    Didascalia estesa in inglese (facoltativa).
---

Didascalia estesa in italiano (facoltativa): il racconto dell'opera, compare nella scheda sotto i dati.
```

Foto di dettaglio (facoltative), da aggiungere ai campi:

```yaml
dettagli:
  - immagine: ../../assets/opere/nome-opera-dettaglio-1.jpg
    alt: "Dettaglio della pennellata"
```

## Provare il sito sul computer

Serve Node.js 22.12 o successivo.

```bash
npm ci          # la prima volta
npm run dev     # apre il sito su http://localhost:4321
```

## Prima pubblicazione su GitHub

1. Crea un repository pubblico (es. `siro`) e caricaci tutti questi file.
2. In **Settings > Pages**, alla voce **Source** scegli **GitHub Actions**.
3. Al primo caricamento parte la pubblicazione: avanzamento visibile nella scheda **Actions**.
4. Indirizzo provvisorio: `https://<tuo-utente>.github.io/siro/`

Nota: se il repository si chiama `<tuo-utente>.github.io`, in `pubblica.yml` metti `BASE_PATH: /`.

## Quando arriva il dominio

1. In `.github/workflows/pubblica.yml` cambia: `SITE_URL: https://www.dominio.it` e `BASE_PATH: /`
2. In **Settings > Pages > Custom domain** inserisci il dominio e attiva **Enforce HTTPS**.
3. Dal pannello del registrar imposta i DNS indicati da GitHub.
4. In `src/data/sito.json` metti `"indicizzabile": true` per aprire il sito ai motori di ricerca.
5. Verifica che il dominio abbia il **rinnovo automatico** attivo.

## Scelte da tenere ferme

- **Versioni bloccate**: `package.json` e `package-lock.json` fissano le versioni esatte. Il sito non cambia finché non si decide di aggiornare.
- **Caratteri in locale** (Archivo e Big Shoulders Stencil): nessuna chiamata a Google Fonts, quindi nessun trasferimento di dati a terzi.
- **Nessun modulo contatti**: solo link email, nessun servizio esterno.
- **Sito nascosto ai motori di ricerca** finché `indicizzabile` è `false`.

## Da verificare con l'artista

- **Ordine delle misure**: nelle didascalie originali era incoerente. Le schede usano altezza × base ricavate dall'orientamento della foto. Da confermare opera per opera.
- **"Olio su acrilico"**: dicitura riportata come da didascalia. Probabilmente "olio e acrilico su tela".
- **Supporto** (tela, tavola, carta): indicato solo per una delle due Tela de pintura.
- **Felt (versione arancio)**: didascalia illeggibile, mancano titolo, tecnica e misure. Nella galleria è mostrata come se fosse larga 100 cm.
- **Ljubav 60x50**: molto simile alla 70x50, confermare che siano opere distinte.
- **Tela de pintura**: le due schede sono la stessa opera; per ora restano entrambe.
- **Money 60x50**: la foto ritagliata risulta orizzontale, controllare le misure.
- **Biografia, email, Instagram, testi delle opere**: da fornire.
- **Foto**: le attuali vengono da WhatsApp (circa 1.000-1.600 pixel). Gli originali ad alta risoluzione migliorerebbero molto le schede.

### Aggiornamento di ottobre 2026 (nuove opere)

- **Due opere nascoste** (`pubblicata: false`): `senza-titolo-art` e `senza-titolo-life`. Le foto sono arrivate senza didascalia: servono titolo, tecnica, misure e data, poi basta mettere `pubblicata: true`.
- **Art Alert Art**: didascalia originale in inglese con refuso ("Oil on acrilic"); sul sito è "Olio su acrilico".
- **Twist**: didascalia "40 × 60" ma la tela è orizzontale.
- **Never judge** e **You choose**: l'ingombro usato per la scala in galleria è stimato (dittico impilato 80 × 60 cm, polittico in due file da sei 80 × 180 cm). Confermare come vanno allestiti.
- **Nome del secondo progetto**: in Home è "Don’t Judge, Never Judge.". Da confermare.

### Aggiornamento di novembre 2026

- **Traduzioni inglesi**: scritte da Claude a partire dai testi dell’artista. Da far rileggere a un madrelingua, soprattutto la biografia.
- **Man e Heartbeat**: foto sostituite con quelle nuove (stesse didascalie). Se erano opere diverse, vanno ripristinate le precedenti.
- **Felt (tre tele)**: arrivate con tre didascalie identiche; per ora sono una sola scheda. Confermare se trittico o tre opere.
- **Olvido**: in didascalia "Owlido", probabile refuso. **Cada obra tiene mas de una Vida**: in spagnolo corretto "más".
- **Polittico** (assi di legno PEKER WOOD MARKET STOCK): titolo generico e misure mancanti.
- **Buio ed Elements**: misure delle tele riportate come in didascalia; l’ingombro in galleria è stimato.
- **Luce**: foto senza didascalia, nascosta (`pubblicata: false`).
- **Nome e cognome** nella didascalia del ritratto: da inserire in `src/data/sito.json` (`artista.nomeCompleto`).
- **Serie**: le serie Not seen, not read, felt (con Invisible e Visible), Wool, Art e le altre sono un raggruppamento provvisorio.

### Sale colorate e introduzione (novembre 2026)

- **Colore delle sale in Home**: nel file di ogni capitolo, campo `parete` (bianco, giallo, rosso, verde, azzurro, blu, fucsia, nero). La sala di Felt e quelle dei titoli dei progetti si impostano in `src/data/sito.json` (`pareteApertura`, `progetti[].parete`). I colori sono presi dalle tele e definiti in `src/styles/global.css`.
- **Introduzione "stencil"**: compare alla prima visita di ogni sessione, dura meno di 2 secondi, si salta con un clic o un tasto e non compare per chi ha ridotto le animazioni nel sistema.
- **Modulo contatti**: incollare la chiave di Web3Forms in `src/data/sito.json`, voce `moduloContatti.accessKey`.

### Aggiornamento del 9 novembre 2026

- **10 nuove opere** (78 in galleria): Who owns the word?, Unlock, Fly, It’s up to you, Bred & Oil, Tribute to David Hockney, Twist 90 × 60, Ego alter, Bubble, Ludovica (nuova serie "Custom work").
- **Data facoltativa**: Bubble e Ludovica sono arrivate senza data, la didascalia la omette.
- **Da verificare**: "Bred" o "Bread"; foto di Hockney forse parziale; consenso a pubblicare un’opera con il nome di una persona (Ludovica).
- **Biografia** "Prima di SIRO" in italiano e inglese (traduzione da far rileggere).
- **Instagram** @siroverseart in apertura della pagina Contatti (`instagram` in `src/data/sito.json`).
