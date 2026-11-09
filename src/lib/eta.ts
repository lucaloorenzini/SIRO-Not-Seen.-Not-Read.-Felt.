/** Anni compiuti alla data indicata (di default oggi). */
export function eta(nascita: string, oggi = new Date()): number {
  const n = new Date(nascita + 'T00:00:00');
  let anni = oggi.getFullYear() - n.getFullYear();
  const compiuti = oggi.getMonth() > n.getMonth() || (oggi.getMonth() === n.getMonth() && oggi.getDate() >= n.getDate());
  if (!compiuti) anni--;
  return anni;
}
