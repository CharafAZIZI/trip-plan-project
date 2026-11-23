import { FavoriteButton } from '@/components/destination/favorite-button';
import { Icon } from '@/components/ui/icon';
import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { CATEGORY_LABELS, type Destination } from '@/constants/destinations';
import { useRouter } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

/** Ligne de liste d'une destination (Explorer, Favoris). */
export function DestinationRow({ destination }: { destination: Destination }) {
  const router = useRouter();

  return (
    <Pressable
      role="link"
      accessibilityLabel={destination.name}
      onPress={() => router.push(`./destination/${destination.id}`)}
      className="bg-card flex-row items-center gap-3 rounded-3xl p-2.5 shadow-sm shadow-midnight/5 active:opacity-90">
      <Scene palette={destination.palette} className="size-22 overflow-hidden rounded-2xl" />

      <View className="flex-1 gap-1">
        <Text className="text-base font-bold" numberOfLines={1}>
          {destination.name}
        </Text>
        <View className="flex-row items-center gap-1">
          <Icon as={MapPin} className="text-muted-foreground size-3" />
          <Text className="text-muted-foreground text-xs font-medium" numberOfLines={1}>
            {destination.region}
          </Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Icon as={Star} className="text-chart-5 size-3" />
          <Text className="text-xs font-bold">{destination.rating.toFixed(1).replace('.', ',')}</Text>
          <Text className="text-accent-foreground text-xs font-bold">
            · {CATEGORY_LABELS[destination.category]}
          </Text>
        </View>
      </View>

      <FavoriteButton id={destination.id} className="shadow-none" />
    </Pressable>
  );
}