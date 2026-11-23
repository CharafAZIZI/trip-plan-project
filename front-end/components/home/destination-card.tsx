import { FavoriteButton } from '@/components/destination/favorite-button';
import { Icon } from '@/components/ui/icon';
import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import type { Destination } from '@/constants/destinations';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';
import { MapPin, Star } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type DestinationCardProps = {
  destination: Destination;
  className?: string;
};

export function DestinationCard({ destination, className }: DestinationCardProps) {
  const router = useRouter();

  return (
    <Pressable
      role="link"
      accessibilityLabel={destination.name}
      onPress={() => router.push(`./destination/${destination.id}`)}
      className={cn(
        'bg-card w-44 rounded-3xl p-2 shadow-sm shadow-midnight/10 active:opacity-90',
        className
      )}>
      <View className="h-36 overflow-hidden rounded-2xl">
        <Scene palette={destination.palette} className="absolute inset-0" />

        <View className="bg-card/95 absolute top-2 left-2 flex-row items-center gap-1 rounded-full px-2.5 py-1">
          <Icon as={Star} className="text-chart-5 size-3" />
          <Text className="text-xs font-bold">{destination.rating.toFixed(1).replace('.', ',')}</Text>
        </View>

        <FavoriteButton id={destination.id} className="absolute top-2 right-2 size-9" />
      </View>

      <View className="gap-0.5 px-1.5 pt-2.5 pb-1.5">
        <Text className="text-base font-bold" numberOfLines={1}>
          {destination.name}
        </Text>
        <View className="flex-row items-center gap-1">
          <Icon as={MapPin} className="text-muted-foreground size-3" />
          <Text className="text-muted-foreground text-xs font-medium" numberOfLines={1}>
            {destination.region}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}