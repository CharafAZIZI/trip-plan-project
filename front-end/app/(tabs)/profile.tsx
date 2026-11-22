import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useTabBarMetrics } from '@/hooks/use-tab-bar-metrics';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useAuthStore } from '@/stores/auth-store';
import { LogOut } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const colors = useThemeColors();
  const { contentInset } = useTabBarMetrics();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: contentInset }}>
        <View className="w-full gap-6 self-center" style={{ maxWidth: 560 }}>
          <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
            Profil
          </Text>

          <View className="items-center gap-1.5">
            <View className="bg-primary size-22 items-center justify-center rounded-full shadow-lg shadow-primary/30">
              <Text className="text-primary-foreground text-3xl font-extrabold">
                {(user?.name ?? 'T').charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="mt-2 text-lg font-bold">{user?.name}</Text>
            <Text className="text-muted-foreground text-sm">{user?.email}</Text>
          </View>

          <Button variant="outline" size="lg" onPress={signOut}>
            <Icon as={LogOut} className="text-destructive size-5" />
            <Text className="text-destructive">Se déconnecter</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 