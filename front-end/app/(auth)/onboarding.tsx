import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Scene, type ScenePalette } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import { ArrowRight, CalendarDays, Sparkles, Wallet, type LucideIcon } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewInstance,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Tag = { icon: LucideIcon; label: string; position: string };

type Slide = {
  id: string;
  title: string;
  description: string;
  palette: ScenePalette;
  tags: Tag[];
};

const SLIDES: Slide[] = [
  {
    id: 'plan',
    title: 'Planifiez votre voyage en quelques secondes',
    description:
      'Indiquez votre destination, votre durée et vos envies : TripPlan prépare un programme jour par jour.',
    palette: 'sky',
    tags: [
      { icon: CalendarDays, label: 'Jour 1 · Médina d’Oujda', position: 'left-4 top-5' },
      { icon: Sparkles, label: 'Programme généré', position: 'right-4 top-24' },
    ],
  },
  {
    id: 'budget',
    title: 'Gardez votre budget sous contrôle',
    description:
      'Visualisez la répartition de vos dépenses : hébergement, repas, transport et activités.',
    palette: 'ice',
    tags: [
      { icon: Wallet, label: 'Budget : 1 500 MAD', position: 'left-4 top-5' },
      { icon: CalendarDays, label: '3 jours', position: 'right-4 top-24' },
    ],
  },
  {
    id: 'gems',
    title: 'Découvrez les trésors cachés du Maroc',
    description:
      'Villages, paysages et adresses authentiques de l’Oriental, loin des circuits habituels.',
    palette: 'teal',
    tags: [{ icon: Sparkles, label: 'Hidden Gems de l’Oriental', position: 'left-4 top-5' }],
  },
];

const MAX_WIDTH = 520;
const SIDE_PADDING = 20;

export default function OnboardingScreen() {
  const router = useRouter();
  const colors = useThemeColors();
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const { width: windowWidth } = useWindowDimensions();
  const [slideWidth, setSlideWidth] = useState(Math.min(windowWidth, MAX_WIDTH) - SIDE_PADDING * 2);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollViewInstance>(null);

  const isLast = index === SLIDES.length - 1;

  function onMomentumEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / slideWidth));
  }

  function onNext() {
    if (isLast) {
      completeOnboarding();
      router.replace('/register');
      return;
    }
    scrollRef.current?.scrollTo({ x: (index + 1) * slideWidth, animated: true });
    setIndex(index + 1);
  }

  function onSkip() {
    completeOnboarding();
    router.replace('/login');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="w-full flex-1 self-center px-5" style={{ maxWidth: MAX_WIDTH }}>
        <View className="h-12 items-end justify-center">
          <Pressable
            role="button"
            hitSlop={12}
            onPress={onSkip}
            accessibilityLabel="Passer la présentation">
            <Text className="text-primary text-base font-bold">Passer</Text>
          </Pressable>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onLayout={(event) => setSlideWidth(event.nativeEvent.layout.width)}
          onMomentumScrollEnd={onMomentumEnd}
          className="flex-1">
          {SLIDES.map((slide) => (
            <View key={slide.id} style={{ width: slideWidth }} className="gap-6">
              <View className="h-80 overflow-hidden rounded-[32px]">
                <Scene palette={slide.palette} className="absolute inset-0" />
                {slide.tags.map((tag) => (
                  <View
                    key={tag.label}
                    className={cn(
                      'bg-card absolute flex-row items-center gap-1.5 rounded-full px-3 py-2 shadow-sm',
                      tag.position
                    )}>
                    <Icon as={tag.icon} className="text-primary size-4" />
                    <Text className="text-xs font-bold">{tag.label}</Text>
                  </View>
                ))}
              </View>

              <View className="gap-2.5">
                <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
                  {slide.title}
                </Text>
                <Text className="text-muted-foreground text-base leading-6">{slide.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="gap-6 pt-4 pb-6">
          <View
            className="flex-row items-center justify-center gap-1.5"
            accessibilityLabel={`Page ${index + 1} sur ${SLIDES.length}`}>
            {SLIDES.map((slide, i) => (
              <View
                key={slide.id}
                className={cn('h-2 rounded-full', i === index ? 'bg-primary w-7' : 'bg-sky w-2')}
              />
            ))}
          </View>

          <Button size="lg" onPress={onNext}>
            <Text>{isLast ? 'Commencer' : 'Suivant'}</Text>
            <Icon as={ArrowRight} className="text-primary-foreground size-5" />
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}