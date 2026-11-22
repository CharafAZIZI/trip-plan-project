import { View, ScrollView } from 'react-native';

import HomeHeader from '@/components/home/home-header';
import { HeroBanner } from '@/components/home/hero-banner';
import { HiddenGems } from '@/components/home/hidden-gems';
import { SearchBar } from '@/components/home/search-bar';
import { Text } from '@/components/ui/text';
import { useTabBarMetrics } from '@/hooks/use-tab-bar-metrics';
import { useAuthStore } from '@/stores/auth-store';

export default function HomeScreen() {
  const { contentInset } = useTabBarMetrics();
  const firstName = useAuthStore((state) => state.user?.name.split(' ')[0]);

  return (
    <View className="bg-background flex-1">
      <HomeHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: contentInset }}>
        <View className="w-full gap-5 self-center pt-5" style={{ maxWidth: 1200 }}>
          <View className="gap-1 px-5 md:px-8">
            <Text className="text-muted-foreground text-sm font-medium">
              {firstName ? `Bonjour, ${firstName}` : 'Bonjour'}
            </Text>
            <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
              Où partons-nous ?
            </Text>
          </View>

          <View className="gap-5 px-5 md:px-8">
            <SearchBar />
            <HeroBanner />
          </View>

          <HiddenGems />
        </View>
      </ScrollView>
    </View>
  );
}