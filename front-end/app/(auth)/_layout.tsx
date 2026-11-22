import { useThemeColors } from '@/hooks/use-theme-colors';
import { Stack } from 'expo-router';

// Point d'entrée du groupe : le splash décide ensuite où aller.
export const unstable_settings = { anchor: 'splash' };

export default function AuthLayout() {
  const colors = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}