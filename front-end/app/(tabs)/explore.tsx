import { DestinationRow } from '@/components/destination/destination-row';
import { SearchInput } from '@/components/forms/search-input';
import { TabScreen } from '@/components/screen/tab-screen';
import { Chip } from '@/components/ui/chip';
import { Text } from '@/components/ui/text';
import {
  CATEGORY_LABELS,
  DESTINATIONS,
  type DestinationCategory,
} from '@/constants/destinations';
import { normalize } from '@/lib/format';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

const CATEGORIES = Object.keys(CATEGORY_LABELS) as DestinationCategory[];

export default function ExploreScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<DestinationCategory | null>(null);

  const results = useMemo(() => {
    const needle = normalize(query.trim());
    return DESTINATIONS.filter(
      (item) =>
        (!category || item.category === category) &&
        (!needle || normalize(`${item.name} ${item.region}`).includes(needle))
    );
  }, [query, category]);

  return (
    <TabScreen title="Explorer">
      <SearchInput value={query} onChangeText={setQuery} placeholder="Rechercher un lieu…" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
        <Chip label="Tout" selected={category === null} onPress={() => setCategory(null)} />
        {CATEGORIES.map((value) => (
          <Chip
            key={value}
            label={CATEGORY_LABELS[value]}
            selected={category === value}
            onPress={() => setCategory(category === value ? null : value)}
          />
        ))}
      </ScrollView>

      <View className="gap-3">
        {results.length > 0 ? (
          results.map((destination) => <DestinationRow key={destination.id} destination={destination} />)
        ) : (
          <Text className="text-muted-foreground py-8 text-center text-base">
            Aucun lieu ne correspond à votre recherche.
          </Text>
        )}
      </View>
    </TabScreen>
  );
}