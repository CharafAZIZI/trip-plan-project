import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { useGoBack } from '@/hooks/use-go-back';
import { formatMAD, plural } from '@/lib/format';
import { countVisits } from '@/lib/trips';
import { cn } from '@/lib/utils';
import { useTripsStore } from '@/stores/trips-store';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  CalendarDays,
  Car,
  Download,
  MapPin,
  Sparkles,
  Wallet,
  type LucideIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Stat({ icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <View className="bg-card flex-1 flex-row items-center justify-center gap-1.5 rounded-2xl py-3 shadow-sm shadow-midnight/5">
      <Icon as={icon} className="text-primary size-4" />
      <Text className="text-xs font-bold">{label}</Text>
    </View>
  );
}

export default function TripScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useGoBack('/trips');
  const insets = useSafeAreaInsets();
  const trip = useTripsStore((state) => state.trips.find((item) => item.id === id));
  const toggleOffline = useTripsStore((state) => state.toggleOffline);
  const [dayIndex, setDayIndex] = useState(0);

  if (!trip) return <Redirect href="/trips" />;

  const day = trip.days[dayIndex] ?? trip.days[0];

  return (
    <View className="bg-background flex-1">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 16) + 16 }}>
        <Scene palette="sky" className="h-44 overflow-hidden rounded-b-[32px]" />

        <View className="w-full gap-4 self-center px-5 pt-4" style={{ maxWidth: 720 }}>
          <View className="flex-row items-start justify-between gap-3">
            <View className="flex-1 gap-1">
              <Text role="heading" aria-level="1" className="text-2xl font-extrabold tracking-tight">
                {trip.title}
              </Text>
              <Text className="text-muted-foreground text-sm">Itinéraire personnalisé</Text>
            </View>
            <View className="bg-accent flex-row items-center gap-1 rounded-full px-3 py-1.5">
              <Icon as={Sparkles} className="text-accent-foreground size-3.5" />
              <Text className="text-accent-foreground text-xs font-bold">IA</Text>
            </View>
          </View>

          <View className="flex-row gap-2.5">
            <Stat icon={CalendarDays} label={plural(trip.days.length, 'jour', 'jours')} />
            <Stat icon={Wallet} label={formatMAD(trip.budget)} />
            <Stat icon={MapPin} label={plural(countVisits(trip), 'lieu', 'lieux')} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
            {trip.days.map((item, index) => (
              <Chip
                key={item.day}
                label={`Jour ${item.day}`}
                selected={index === dayIndex}
                onPress={() => setDayIndex(index)}
              />
            ))}
          </ScrollView>

          <View className="gap-1">
            {day.stops.map((stop) => (
              <View key={stop.id} className="gap-1">
                {stop.travelMinutes ? (
                  <View className="ml-14 flex-row items-center gap-1.5 py-1">
                    <Icon as={Car} className="text-accent-foreground size-3.5" />
                    <Text className="text-accent-foreground text-xs font-bold">
                      {stop.travelMinutes} min en voiture
                    </Text>
                  </View>
                ) : null}

                <View className="flex-row items-center gap-3">
                  <Text className="text-muted-foreground w-11 text-xs font-bold">{stop.time}</Text>
                  <Pressable
                    role={stop.destinationId ? 'link' : undefined}
                    disabled={!stop.destinationId}
                    onPress={() => router.push(`./destination/${stop.destinationId}`)}
                    className={cn(
                      'bg-card flex-1 gap-0.5 rounded-2xl border-l-4 p-3 shadow-sm shadow-midnight/5 active:opacity-90',
                      stop.kind === 'visit' ? 'border-primary' : 'border-turquoise'
                    )}>
                    <Text className="text-base font-bold">{stop.title}</Text>
                    <Text className="text-muted-foreground text-xs">
                      {stop.label} · {stop.duration} · {stop.cost === 0 ? 'Gratuit' : formatMAD(stop.cost)}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          <View className="flex-row gap-3">
            <Button className="h-12 flex-1" onPress={() => router.push(`./trip/${trip.id}/map`)}>
              <Icon as={MapPin} className="text-primary-foreground size-4" />
              <Text>Carte</Text>
            </Button>
            <Button
              variant="outline"
              className="h-12 flex-1"
              onPress={() => router.push(`./trip/${trip.id}/budget`)}>
              <Icon as={Wallet} className="text-foreground size-4" />
              <Text>Budget</Text>
            </Button>
          </View>

          <Chip
            label={trip.offline ? 'Disponible hors connexion' : 'Enregistrer hors connexion'}
            icon={Download}
            selected={trip.offline}
            onPress={() => toggleOffline(trip.id)}
            className="self-start"
          />
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', top: insets.top + 8, left: 20 }}>
        <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />
      </View>
    </View>
  );
}