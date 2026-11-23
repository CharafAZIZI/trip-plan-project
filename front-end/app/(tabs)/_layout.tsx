import { FloatingTabBar } from '@/components/navigation/floating-tab-bar';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAuthStore } from '@/stores/auth-store';
import { Redirect, Tabs } from 'expo-router';
import { Compass, Heart, House, Map, UserRound } from 'lucide-react-native';

const ICON_SIZE = 22;

export default function TabsLayout() {
  const colors = useThemeColors();
  const isAuthenticated = useAuthStore((state) => state.user !== null);

  // Non connecté : retour au parcours de démarrage (fonctionne aussi sur le web).
  if (!isAuthenticated) return <Redirect href="/splash" />;

  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.background } }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Accueil', tabBarIcon: ({ color }) => <House color={color} size={ICON_SIZE} /> }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explorer', tabBarIcon: ({ color }) => <Compass color={color} size={ICON_SIZE} /> }}
      />
      <Tabs.Screen
        name="trips"
        options={{ title: 'Voyages', tabBarIcon: ({ color }) => <Map color={color} size={ICON_SIZE} /> }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: 'Favoris', tabBarIcon: ({ color }) => <Heart color={color} size={ICON_SIZE} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil', tabBarIcon: ({ color }) => <UserRound color={color} size={ICON_SIZE} /> }}
      />
    </Tabs>
  );
}