import { Text } from '@/components/ui/text';
import { useTabBarMetrics } from '@/hooks/use-tab-bar-metrics';
import { useThemeColors } from '@/hooks/use-theme-colors';
import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabScreenProps = {
  title: string;
  /** Élément affiché à droite du titre (ex. bouton +). */
  action?: ReactNode;
  children: ReactNode;
};

/** Gabarit des écrans à onglets : safe area, titre, défilement et marge sous la barre flottante. */
export function TabScreen({ title, action, children }: TabScreenProps) {
  const colors = useThemeColors();
  const { contentInset } = useTabBarMetrics();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: contentInset }}>
        <View className="w-full gap-4 self-center" style={{ maxWidth: 720 }}>
          <View className="min-h-11 flex-row items-center justify-between">
            <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
              {title}
            </Text>
            {action}
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}