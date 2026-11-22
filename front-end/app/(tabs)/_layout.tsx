import { Tabs } from 'expo-router';
import { Compass, Heart, House, Map, UserRound } from 'lucide-react-native';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useTabBarMetrics } from '@/hooks/use-tab-bar-metrics';

const ICON_SIZE = 22;

export default function TabsLayout() {
  const colors = useThemeColors();
  const bar = useTabBarMetrics();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarActiveBackgroundColor: colors.secondary,

        tabBarStyle: {
          position: 'absolute',
          left: bar.left,
          bottom: bar.bottom,
          width: bar.width,
          height: bar.height,
          paddingTop: 0,
          paddingBottom: 0,
          paddingHorizontal: 6,
          borderRadius: 32,
          borderTopWidth: 0,
          backgroundColor: colors.card,
          shadowColor: '#172554',
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.18,
          shadowRadius: 24,
          elevation: 12,
        },
        tabBarItemStyle: { marginVertical: 6, marginHorizontal: 2, borderRadius: 24 },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
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