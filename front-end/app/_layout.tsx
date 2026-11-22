import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { useAuthStore } from '@/stores/auth-store';
import { ThemeProvider } from 'expo-router/react-navigation';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();
  const isAuthenticated = useAuthStore((state) => state.user !== null);

  return (
    <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <Stack screenOptions={{ headerShown: false }}>
        {/* Réservé aux utilisateurs connectés */}
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>

        {/* Splash, onboarding, connexion, inscription */}
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>

      <PortalHost />
    </ThemeProvider>
  );
}