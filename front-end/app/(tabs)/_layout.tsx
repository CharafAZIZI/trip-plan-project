import { Tabs } from 'expo-router';
import {
  House,
  Compass,
  Map,
  Heart,
  UserRound,
} from 'lucide-react-native';

import {
  Platform,
  useWindowDimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#2563EB',
  inactive: '#94A3B8',
  background: '#FFFFFF',
  border: '#E2E8F0',
};

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Détection des plateformes et dimensions
  const isWeb = Platform.OS === 'web';
  const isLargeScreen = width >= 768;
  const isDesktop = width >= 1024;

  // Dimensions adaptatives
  const tabBarHeight = isWeb
    ? isDesktop ? 68 : 65
    : Platform.OS === 'ios' ? 60 + insets.bottom : 65 + insets.bottom;

  const tabBarPaddingTop = isLargeScreen ? 8 : 6;

  const tabBarPaddingBottom = isWeb
    ? 6
    : Platform.OS === 'ios'
      ? Math.max(insets.bottom, 8)
      : Math.max(insets.bottom, 8);

  const iconSize = isLargeScreen ? 23 : 22;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarStyle: {
          height: tabBarHeight,
          paddingTop: tabBarPaddingTop,
          paddingBottom: tabBarPaddingBottom,
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 0,

          // Adaptation Web
          ...(isWeb && {
            position: 'relative',
          }),
        },

        tabBarLabelStyle: {
          fontSize: isLargeScreen ? 12 : 11,
          fontWeight: '600',
          marginTop: 3,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <House color={color} size={iconSize} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explorer',
          tabBarIcon: ({ color }) => (
            <Compass color={color} size={iconSize} />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: 'Voyages',
          tabBarIcon: ({ color }) => (
            <Map color={color} size={iconSize} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoris',
          tabBarIcon: ({ color }) => (
            <Heart color={color} size={iconSize} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
            <UserRound color={color} size={iconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
