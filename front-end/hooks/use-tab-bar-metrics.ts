import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TAB_BAR_HEIGHT = 64;
const SIDE_MARGIN = 16;
const MAX_WIDTH = 560;
const MIN_BOTTOM = 12;

/**
 * Dimensions de la barre d'onglets flottante.
 * `contentInset` : marge basse à ajouter aux écrans défilants pour ne pas passer sous la barre.
 */
export function useTabBarMetrics() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const barWidth = Math.min(width - SIDE_MARGIN * 2, MAX_WIDTH);
  const bottom = Math.max(insets.bottom, MIN_BOTTOM);

  return {
    height: TAB_BAR_HEIGHT,
    width: barWidth,
    left: (width - barWidth) / 2,
    bottom,
    contentInset: TAB_BAR_HEIGHT + bottom + SIDE_MARGIN,
  };
}