// Configurazione del sito.
// SITE_URL e BASE_PATH arrivano dalla pubblicazione automatica su GitHub
// (vedi .github/workflows/pubblica.yml). In locale valgono i valori di riserva.
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
