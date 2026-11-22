import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

const PALETTES = {
  sky: ['#93C5FD', '#0D9488', '#172554'],
  teal: ['#99F6E4', '#0D9488', '#0F766E'],
  sun: ['#FDE68A', '#F59E0B', '#B45309'],
  ice: ['#BFDBFE', '#2563EB', '#172554'],
  night: ['#2563EB', '#1D4ED8', '#172554'],
} as const;

export type ScenePalette = keyof typeof PALETTES;

type SceneProps = {
  palette?: ScenePalette;
  className?: string;
};

/** Paysage vectoriel de remplacement des photos. Il remplit son conteneur : donnez-lui une hauteur. */
export function Scene({ palette = 'sky', className }: SceneProps) {
  const [sky, far, near] = PALETTES[palette];

  return (
    <View className={className} accessibilityElementsHidden importantForAccessibility="no">
      <Svg width="100%" height="100%" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice">
        <Rect width={300} height={200} fill={sky} />
        <Circle cx={220} cy={55} r={22} fill="#FDE68A" />
        <Path d="M0 150L80 80l70 70 60-50 90 80v50H0z" fill={far} />
        <Path d="M0 175l100-50 80 45 120-40v70H0z" fill={near} />
      </Svg>
    </View>
  );
}