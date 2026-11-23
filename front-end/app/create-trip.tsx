import { TextField } from '@/components/ui/text-field';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { CATEGORY_LABELS, type DestinationCategory } from '@/constants/destinations';
import { useGoBack } from '@/hooks/use-go-back';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { formatMAD, plural } from '@/lib/format';
import { LIMITS } from '@/lib/trips';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Check, MapPin, Minus, Plus, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INTERESTS = Object.keys(CATEGORY_LABELS) as DestinationCategory[];

type StepperProps = {
  value: string;
  onMinus: () => void;
  onPlus: () => void;
  minusDisabled: boolean;
  plusDisabled: boolean;
  label: string;
};

function Stepper({ value, onMinus, onPlus, minusDisabled, plusDisabled, label }: StepperProps) {
  return (
    <View className="flex-row items-center gap-3">
      <Text className="flex-1 text-xl font-extrabold">{value}</Text>
      <IconButton
        icon={Minus}
        label={`Diminuer : ${label}`}
        disabled={minusDisabled}
        className={minusDisabled ? 'bg-secondary opacity-40 shadow-none' : 'bg-secondary shadow-none'}
        onPress={onMinus}
      />
      <IconButton
        icon={Plus}
        label={`Augmenter : ${label}`}
        variant="primary"
        disabled={plusDisabled}
        className={plusDisabled ? 'opacity-40' : undefined}
        onPress={onPlus}
      />
    </View>
  );
}

export default function CreateTripScreen() {
  const params = useLocalSearchParams<{ destination?: string }>();
  const router = useRouter();
  const goBack = useGoBack('/');
  const colors = useThemeColors();

  const [destination, setDestination] = useState(params.destination ?? '');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(1500);
  const [interests, setInterests] = useState<DestinationCategory[]>(['nature', 'culture']);
  const [error, setError] = useState<string>();

  const budgetPercent = ((budget - LIMITS.minBudget) / (LIMITS.maxBudget - LIMITS.minBudget)) * 100;

  function toggleInterest(value: DestinationCategory) {
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  }

  function onSubmit() {
    if (!destination.trim()) {
      setError('Indiquez une destination.');
      return;
    }
    const query = new URLSearchParams({
      destination: destination.trim(),
      days: String(days),
      budget: String(budget),
      interests: interests.join(','),
    });
    router.replace(`./generating?${query.toString()}`);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full flex-1 gap-5 self-center px-5 pt-2 pb-6" style={{ maxWidth: 560 }}>
            <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />

            <View className="gap-2">
              <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
                Votre voyage idéal
              </Text>
              <Text className="text-muted-foreground text-base">
                Dites-nous l’essentiel, TripPlan s’occupe du reste.
              </Text>
            </View>

            <TextField
              label="Destination"
              icon={MapPin}
              placeholder="Oujda, Berkane, Figuig…"
              value={destination}
              onChangeText={(value) => {
                setDestination(value);
                setError(undefined);
              }}
              error={error}
              autoCapitalize="words"
            />

            <View className="bg-card gap-1 rounded-3xl p-4 shadow-sm shadow-midnight/5">
              <Text className="text-muted-foreground text-sm font-bold">Durée</Text>
              <Stepper
                label="durée"
                value={plural(days, 'jour', 'jours')}
                minusDisabled={days <= LIMITS.minDays}
                plusDisabled={days >= LIMITS.maxDays}
                onMinus={() => setDays((value) => value - 1)}
                onPlus={() => setDays((value) => value + 1)}
              />
            </View>

            <View className="bg-card gap-1 rounded-3xl p-4 shadow-sm shadow-midnight/5">
              <Text className="text-muted-foreground text-sm font-bold">Budget total</Text>
              <Stepper
                label="budget"
                value={formatMAD(budget)}
                minusDisabled={budget <= LIMITS.minBudget}
                plusDisabled={budget >= LIMITS.maxBudget}
                onMinus={() => setBudget((value) => value - LIMITS.budgetStep)}
                onPlus={() => setBudget((value) => value + LIMITS.budgetStep)}
              />
              <View className="bg-secondary mt-2 h-2 overflow-hidden rounded-full">
                <View className="bg-primary h-2 rounded-full" style={{ width: `${budgetPercent}%` }} />
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-muted-foreground text-xs">{formatMAD(LIMITS.minBudget)}</Text>
                <Text className="text-muted-foreground text-xs">{formatMAD(LIMITS.maxBudget)}</Text>
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-muted-foreground text-sm font-bold">Préférences</Text>
              <View className="flex-row flex-wrap gap-2">
                {INTERESTS.map((value) => (
                  <Chip
                    key={value}
                    label={CATEGORY_LABELS[value]}
                    icon={interests.includes(value) ? Check : undefined}
                    selected={interests.includes(value)}
                    onPress={() => toggleInterest(value)}
                  />
                ))}
              </View>
            </View>

            <View className="min-h-4 flex-1" />

            <Button size="lg" onPress={onSubmit}>
              <Icon as={Sparkles} className="text-primary-foreground size-5" />
              <Text>Générer mon programme</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}