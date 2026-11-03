import { Tabs } from "expo-router";
import {
  House,
  Compass,
  Map,
  Heart,
  UserRound,
} from "lucide-react-native";

const COLORS = {
  primary: "#2563EB",
  inactive: "#94A3B8",
  background: "#FFFFFF",
  border: "#E2E8F0",
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,

        tabBarStyle: {
          height: 85,
          paddingTop: 10,
          paddingBottom: 22,
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <House color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Explorer",
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="trips"
        options={{
          title: "Voyages",
          tabBarIcon: ({ color, size }) => (
            <Map color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoris",
          tabBarIcon: ({ color, size }) => (
            <Heart color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
