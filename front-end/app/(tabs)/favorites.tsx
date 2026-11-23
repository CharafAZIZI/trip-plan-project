import { DestinationRow } from '@/components/destination/destination-row';
import { TabScreen } from '@/components/screen/tab-screen';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { DESTINATIONS } from '@/constants/destinations';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { View } from 'react-native';

export default function FavoritesScreen() {
  const router = useRouter();
  const ids = useFavoritesStore((state) => state.ids);
  const favorites = DESTINATIONS.filter((destination) => ids.includes(destination.id));

  return (
    <TabScreen title="Favoris">
      {favorites.length > 0 ? (
        <View className="gap-3">
          {favorites.map((destination) => (
            <DestinationRow key={destination.id} destination={destination} />
          ))}
        </View>
      ) : (
        <View className="items-center gap-3 py-12">
          <View className="bg-secondary size-20 items-center justify-center rounded-full">
            <Icon as={Heart} className="text-primary size-8" />
          </View>
          <Text className="text-lg font-bold">Aucun favori pour l’instant</Text>
          <Text className="text-muted-foreground text-center text-base">
            Enregistrez les lieux qui vous donnent envie avec l’icône signet.
          </Text>
          <Button size="lg" className="mt-2 px-8" onPress={() => router.push('/explore')}>
            <Text>Explorer</Text>
          </Button>
        </View>
      )}
    </TabScreen>
  );
}