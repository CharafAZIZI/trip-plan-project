import { FavoriteButton } from '@/components/destination/favorite-button';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { CATEGORY_LABELS, getDestination } from '@/constants/destinations';
import { useGoBack } from '@/hooks/use-go-back';
import { formatMAD } from '@/lib/format';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <View className="bg-card flex-1 rounded-2xl p-3 shadow-sm shadow-midnight/5">
      <Text className="text-muted-foreground text-xs font-medium">{label}</Text>
      <Text className="mt-0.5 text-sm font-bold">{value}</Text>
    </View>
  );
}

export default function DestinationScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useGoBack('/explore');
  const insets = useSafeAreaInsets();
  const destination = getDestination(id);

  if (!destination) return <Redirect href="/explore" />;

  return (
    <View className="bg-background flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <Scene palette={destination.palette} className="h-72 overflow-hidden rounded-b-[32px]" />

        <View className="w-full gap-5 self-center px-5" style={{ maxWidth: 720 }}>
          <View className="bg-card -mt-14 gap-2 rounded-3xl p-4 shadow-md shadow-midnight/10">
            <View className="flex-row gap-2">
              <View className="bg-accent rounded-full px-3 py-1">
                <Text className="text-accent-foreground text-xs font-bold">
                  {CATEGORY_LABELS[destination.category]}
                </Text>
              </View>
              <View className="bg-secondary rounded-full px-3 py-1">
                <Text className="text-primary text-xs font-bold">
                  {destination.cost === 0 ? 'Gratuit' : formatMAD(destination.cost)}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between gap-3">
              <Text role="heading" aria-level="1" className="flex-1 text-2xl font-extrabold">
                {destination.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Icon as={Star} className="text-chart-5 size-4" />
                <Text className="text-base font-bold">
                  {destination.rating.toFixed(1).replace('.', ',')}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-1.5">
              <Icon as={MapPin} className="text-muted-foreground size-4" />
              <Text className="text-muted-foreground text-sm">{destination.region}</Text>
            </View>
          </View>

          <View className="flex-row gap-3">
            <Fact label="Durée" value={destination.duration} />
            <Fact label="Période" value={destination.season} />
            <Fact label="Niveau" value={destination.level} />
          </View>

          <Text className="text-muted-foreground text-base leading-6">{destination.summary}</Text>

          <View className="gap-2">
            <Text role="heading" aria-level="2" className="text-lg font-extrabold">
              Activités
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {destination.activities.map((activity) => (
                <View key={activity} className="bg-card rounded-full px-4 py-2 shadow-sm shadow-midnight/5">
                  <Text className="text-sm font-semibold">{activity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', top: insets.top + 8, left: 20 }}>
        <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />
      </View>

      <View
        className="bg-background flex-row items-center gap-3 px-5 pt-3"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
        <FavoriteButton id={destination.id} className="size-14 rounded-2xl" />
        <Button
          size="lg"
          className="flex-1"
          onPress={() => router.push(`./create-trip?destination=${encodeURIComponent(destination.name)}`)}>
          <Text>Ajouter à mon voyage</Text>
        </Button>
      </View>
    </View>
  );
}