import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { useGoBack } from '@/hooks/use-go-back';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { formatMAD } from '@/lib/format';
import { estimateBudget } from '@/lib/trips';
import { useTripsStore } from '@/stores/trips-store';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Sparkles } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G } from 'react-native-svg';

const SIZE = 176;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TripBudgetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const goBack = useGoBack(`./trip/${id}`);
  const colors = useThemeColors();
  const trip = useTripsStore((state) => state.trips.find((item) => item.id === id));

  if (!trip) return <Redirect href="/trips" />;

  const items = estimateBudget(trip.budget);

  let accumulated = 0;
  const segments = items.map((item) => {
    const length = CIRCUMFERENCE * (item.amount / trip.budget);
    const segment = { key: item.key, color: item.color, length, offset: -accumulated };
    accumulated += length;
    return segment;
  });

  const costByDay = trip.days.map((day) => ({
    day: day.day,
    cost: day.stops.reduce((sum, stop) => sum + stop.cost, 0),
  }));
  const priciest = costByDay.reduce((max, item) => (item.cost > max.cost ? item : max), costByDay[0]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="w-full gap-5 self-center px-5 pt-2" style={{ maxWidth: 560 }}>
          <View className="flex-row items-center justify-between">
            <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />
            <Text role="heading" aria-level="1" className="text-lg font-extrabold">
              Budget du voyage
            </Text>
            <View className="size-11" />
          </View>

          <View className="bg-card gap-4 rounded-3xl p-5 shadow-sm shadow-midnight/5">
            <View className="size-44 items-center justify-center self-center">
              <Svg width={SIZE} height={SIZE} style={{ position: 'absolute' }}>
                <G transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
                  {segments.map((segment) => (
                    <Circle
                      key={segment.key}
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={RADIUS}
                      fill="none"
                      stroke={segment.color}
                      strokeWidth={STROKE}
                      strokeDasharray={`${segment.length} ${CIRCUMFERENCE - segment.length}`}
                      strokeDashoffset={segment.offset}
                    />
                  ))}
                </G>
              </Svg>
              <Text className="text-muted-foreground text-xs font-medium">Total estimé</Text>
              <Text className="text-2xl font-extrabold">{formatMAD(trip.budget)}</Text>
            </View>

            <View>
              {items.map((item) => (
                <View key={item.key} className="flex-row items-center gap-3 py-2.5">
                  <View className="size-3 rounded" style={{ backgroundColor: item.color }} />
                  <Text className="flex-1 text-base font-bold">{item.label}</Text>
                  <Text className="text-base font-bold">{formatMAD(item.amount)}</Text>
                  <Text className="text-muted-foreground w-10 text-right text-xs">
                    {Math.round(item.share * 100)} %
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="bg-accent flex-row items-start gap-3 rounded-2xl p-4">
            <Icon as={Sparkles} className="text-accent-foreground size-5" />
            <Text className="text-accent-foreground flex-1 text-sm leading-5">
              <Text className="text-accent-foreground text-sm font-bold">Bon à savoir : </Text>
              {priciest.cost > 0
                ? `le jour ${priciest.day} est le plus coûteux (${formatMAD(priciest.cost)} de repas et d’activités).`
                : 'toutes vos activités sont gratuites, seuls les repas pèsent sur le budget.'}{' '}
              La répartition ci-dessus est indicative.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}