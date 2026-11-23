import { TabScreen } from '@/components/screen/tab-screen';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { MenuRow } from '@/components/ui/menu-row';
import { Text } from '@/components/ui/text';
import { countVisits } from '@/lib/trips';
import { useAuthStore } from '@/stores/auth-store';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useTripsStore } from '@/stores/trips-store';
import { useRouter } from 'expo-router';
import { Download, Heart, LogOut, Settings } from 'lucide-react-native';
import { View } from 'react-native';

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View className="bg-card flex-1 items-center rounded-2xl py-3 shadow-sm shadow-midnight/5">
      <Text className="text-primary text-2xl font-extrabold">{value}</Text>
      <Text className="text-muted-foreground text-xs font-medium">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const trips = useTripsStore((state) => state.trips);
  const favoritesCount = useFavoritesStore((state) => state.ids.length);

  const places = trips.reduce((total, trip) => total + countVisits(trip), 0);

  return (
    <TabScreen title="Profil">
      <View className="items-center gap-1 py-2">
        <View className="bg-primary size-22 items-center justify-center rounded-full shadow-lg shadow-primary/30">
          <Text className="text-primary-foreground text-3xl font-extrabold">
            {(user?.name ?? 'T').charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text className="mt-2 text-lg font-bold">{user?.name}</Text>
        <Text className="text-muted-foreground text-sm">{user?.email}</Text>
      </View>

      <View className="flex-row gap-3">
        <Stat value={trips.length} label="Voyages" />
        <Stat value={favoritesCount} label="Favoris" />
        <Stat value={places} label="Lieux" />
      </View>

      <View className="bg-card rounded-3xl px-4 py-2 shadow-sm shadow-midnight/5">
        <MenuRow icon={Download} label="Voyages hors connexion" onPress={() => router.push('/trips')} />
        <MenuRow icon={Heart} label="Mes favoris" onPress={() => router.push('/favorites')} />
        <MenuRow icon={Settings} label="Paramètres" onPress={() => router.push('./settings')} />
      </View>

      <Button variant="outline" size="lg" onPress={signOut}>
        <Icon as={LogOut} className="text-destructive size-5" />
        <Text className="text-destructive">Se déconnecter</Text>
      </Button>
    </TabScreen>
  );
}