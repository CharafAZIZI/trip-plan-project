import { Scene } from '@/components/ui/scene';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const SPLASH_DURATION_MS = 1800;

export default function SplashScreen() {
  const router = useRouter();
  const hasSeenOnboarding = useAuthStore((state) => state.hasSeenOnboarding);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 700 });

    const timer = setTimeout(() => {
      router.replace(hasSeenOnboarding ? '/login' : '/onboarding');
    }, SPLASH_DURATION_MS);

    return () => clearTimeout(timer);
  }, [hasSeenOnboarding, progress, router]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.85 + 0.15 * progress.value }],
  }));

  return (
    <View className="bg-primary flex-1">
      <Scene palette="night" className="absolute inset-x-0 bottom-0 h-80" />

      <Animated.View
        style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14 }, logoStyle]}>
        <View className="size-24 items-center justify-center rounded-[30px] bg-white shadow-lg shadow-midnight/30">
          <Image
            source={require('@/assets/images/tripplan-logo.png')}
            style={{ width: 64, height: 64 }}
            resizeMode="contain"
            accessibilityLabel="Logo TripPlan"
          />
        </View>
        <Text className="text-4xl font-extrabold tracking-tight text-white">TripPlan</Text>
        <Text className="text-base font-semibold text-white">Discover. Plan. Travel.</Text>
      </Animated.View>
    </View>
  );
}