/** « 1500 » → « 1 500 MAD ». */
export function formatMAD(amount: number) {
  return `${Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} MAD`;
}

export function plural(count: number, one: string, many: string) {
  return `${count} ${count > 1 ? many : one}`;
}

/** Minuscules sans accents, pour comparer des recherches. */
export function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}