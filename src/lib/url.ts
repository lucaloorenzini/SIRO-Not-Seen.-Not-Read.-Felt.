// Costruisce i link interni tenendo conto della sottocartella
// (es. /siro su GitHub Pages, / sul dominio definitivo).
export function url(percorso = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = percorso.replace(/^\//, '');
  return p ? `${base}/${p}` : `${base}/`;
}
