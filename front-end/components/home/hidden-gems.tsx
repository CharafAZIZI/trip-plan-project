import { DestinationCard } from '@/components/home/destination-card';
import { Text } from '@/components/ui/text';
import { HIDDEN_GEMS } from '@/constants/destinations';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

/** Section « Hidden Gems of Morocco » : le positionnement de TripPlan. */
export function HiddenGems() {
  const router = useRouter();

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-5 md:px-8">
        <Text role="heading" aria-level="2" className="text-lg font-extrabold">
          Hidden Gems of Morocco
        </Text>
        <Pressable
          role="link"
          hitSlop={12}
          accessibilityLabel="Voir toutes les destinations"
          onPress={() => router.push('/explore')}>
          <Text className="text-primary text-sm font-bold">Voir tout</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-3 px-5 pb-3 md:px-8">
        {HIDDEN_GEMS.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </ScrollView>
    </View>
  );
}