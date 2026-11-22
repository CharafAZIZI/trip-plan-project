import { THEME } from '@/lib/theme';
import { useUniwind } from 'uniwind';

/** Couleurs du thème actif pour les props qui n'acceptent pas de className. */
export function useThemeColors() {
  const { theme } = useUniwind();
  return theme === 'dark' ? THEME.dark : THEME.light;
}