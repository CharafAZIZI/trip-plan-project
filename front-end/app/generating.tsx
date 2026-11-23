import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { cn } from '@/lib/utils';
import { generateTrip, parseTripRequest } from '@/lib/trips';
import { useTripsStore } from '@/stores/trips-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Check, Sparkles } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
  'Analyse de vos préférences',
  'Sélection des meilleurs lieux',
  'Optimisation des trajets',
  'Calcul du budget',
];
const STEP_MS = 900;

export default function GeneratingScreen() {
  const params = useLocalSearchParams<{
    destination?: string;
    days?: string;
    budget?: string;
    interests?: string;
  }>();
  const router = useRouter();
  const colors = useThemeColors();
  const addTrip = useTripsStore((state) => state.add);

  const [step, setStep] = useState(0);
  const finished = useRef(false);

  // Progression simulée : une étape toutes les 900 ms.
  useEffect(() => {
    const timer = setInterval(() => setStep((value) => value + 1), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step < STEPS.length || finished.current) return;
    finished.current = true;
    const trip = generateTrip(parseTripRequest(params));
    addTrip(trip);
    router.replace(`./trip/${trip.id}`);
  }, [step, params, addTrip, router]);

  const request = parseTripRequest(params);
  const percent = Math.min(100, Math.round((step / STEPS.length) * 100));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="w-full flex-1 gap-8 self-center px-5 pt-10 pb-6" style={{ maxWidth: 480 }}>
        <View className="bg-secondary size-52 items-center justify-center self-center rounded-full">
          <View className="bg-sky size-40 items-center justify-center rounded-full">
            <View className="bg-primary size-24 items-center justify-center rounded-full shadow-lg shadow-primary/40">
              <Icon as={Sparkles} className="text-primary-foreground size-11" />
            </View>
          </View>
        </View>

        <View className="items-center gap-2">
          <Text role="heading" aria-level="1" className="text-center text-2xl font-extrabold">
            Création de votre programme
          </Text>
          <Text className="text-muted-foreground text-sm">
            {request.destination} · {request.days} j · {request.budget} MAD
          </Text>
        </View>

        <View className="bg-card rounded-3xl px-5 py-3 shadow-sm shadow-midnight/5">
          {STEPS.map((label, index) => {
            const done = index < step;
            const current = index === step;
            return (
              <View key={label} className="flex-row items-center gap-3 py-2.5">
                <View
                  className={cn(
                    'size-7 items-center justify-center rounded-full border-2',
                    done && 'bg-turquoise border-turquoise',
                    current && 'border-primary',
                    !done && !current && 'border-input'
                  )}>
                  {done ? <Icon as={Check} className="size-4 text-white" /> : null}
                </View>
                <Text className={cn('text-base', current || done ? 'font-bold' : 'text-muted-foreground')}>
                  {label}
                </Text>
              </View>
            );
          })}
        </View>

        <View className="gap-2">
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground text-xs font-bold">Progression</Text>
            <Text className="text-muted-foreground text-xs font-bold">{percent} %</Text>
          </View>
          <View className="bg-secondary h-2 overflow-hidden rounded-full">
            <View className="bg-primary h-2 rounded-full" style={{ width: `${percent}%` }} />
          </View>
        </View>

        <View className="flex-1" />
        <Button variant="outline" size="lg" onPress={() => router.replace('./create-trip')}>
          <Text>Annuler</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}