import { TabScreen } from '@/components/screen/tab-screen';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Scene, type ScenePalette } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { formatMAD, plural } from '@/lib/format';
import { useTripsStore } from '@/stores/trips-store';
import { useRouter } from 'expo-router';
import { CalendarDays, Download, Plus, Wallet } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const PALETTES: ScenePalette[] = ['sky', 'teal', 'sun', 'ice'];

export default function TripsScreen() {
  const router = useRouter();
  const trips = useTripsStore((state) => state.trips);

  return (
    <TabScreen
      title="Mes voyages"
      action={
        <IconButton
          icon={Plus}
          label="Nouveau voyage"
          variant="primary"
          onPress={() => router.push('./create-trip')}
        />
      }>
      {trips.map((trip, index) => (
        <Pressable
          key={trip.id}
          role="link"
          accessibilityLabel={trip.title}
          onPress={() => router.push(`./trip/${trip.id}`)}
          className="bg-card rounded-3xl p-2 shadow-sm shadow-midnight/10 active:opacity-90">
          <View className="h-36 overflow-hidden rounded-2xl">
            <Scene palette={PALETTES[index % PALETTES.length]} className="absolute inset-0" />
            {trip.offline ? (
              <View className="bg-accent absolute top-2.5 left-2.5 flex-row items-center gap-1 rounded-full px-3 py-1.5">
                <Icon as={Download} className="text-accent-foreground size-3" />
                <Text className="text-accent-foreground text-xs font-bold">Hors connexion</Text>
              </View>
            ) : null}
          </View>

          <View className="gap-1.5 px-2 pt-3 pb-2">
            <Text className="text-lg font-extrabold">{trip.title}</Text>
            <View className="flex-row items-center gap-4">
              <View className="flex-row items-center gap-1.5">
                <Icon as={CalendarDays} className="text-muted-foreground size-4" />
                <Text className="text-muted-foreground text-sm">
                  {plural(trip.days.length, 'jour', 'jours')}
                </Text>
              </View>
              <View className="flex-row items-center gap-1.5">
                <Icon as={Wallet} className="text-muted-foreground size-4" />
                <Text className="text-muted-foreground text-sm">{formatMAD(trip.budget)}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      ))}

      <Pressable
        role="button"
        onPress={() => router.push('./create-trip')}
        className="border-sky min-h-20 flex-row items-center justify-center gap-2 rounded-3xl border-2 border-dashed active:opacity-70">
        <Icon as={Plus} className="text-primary size-5" />
        <Text className="text-primary text-base font-bold">Nouveau voyage</Text>
      </Pressable>
    </TabScreen>
  );
}