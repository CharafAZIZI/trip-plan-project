import { IconButton } from '@/components/ui/icon-button';
import { MenuRow } from '@/components/ui/menu-row';
import { Text } from '@/components/ui/text';
import { useGoBack } from '@/hooks/use-go-back';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { useSettingsStore } from '@/stores/settings-store';
import Constants from 'expo-constants';
import { ArrowLeft, Bell, Download, Globe, Info } from 'lucide-react-native';
import { ScrollView, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SwitchRow({
  icon: IconComponent,
  label,
  value,
  onValueChange,
}: {
  icon: typeof Bell;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}) {
  const colors = useThemeColors();

  return (
    <View className="flex-row items-center">
      <View className="flex-1">
        <MenuRow icon={IconComponent} label={label} />
      </View>
      <Switch
        accessibilityLabel={label}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.input, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function SettingsScreen() {
  const goBack = useGoBack('/profile');
  const colors = useThemeColors();
  const { notifications, autoOffline, setNotifications, setAutoOffline } = useSettingsStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="w-full gap-5 self-center px-5 pt-2" style={{ maxWidth: 560 }}>
          <View className="flex-row items-center justify-between">
            <IconButton icon={ArrowLeft} label="Retour" onPress={goBack} />
            <Text role="heading" aria-level="1" className="text-lg font-extrabold">
              Paramètres
            </Text>
            <View className="size-11" />
          </View>

          <View className="bg-card rounded-3xl px-4 py-2 shadow-sm shadow-midnight/5">
            <SwitchRow icon={Bell} label="Notifications" value={notifications} onValueChange={setNotifications} />
            <SwitchRow
              icon={Download}
              label="Voyages hors connexion automatiques"
              value={autoOffline}
              onValueChange={setAutoOffline}
            />
            <MenuRow icon={Globe} label="Langue" value="Français" />
            <MenuRow icon={Info} label="Version" value={Constants.expoConfig?.version ?? '1.0.0'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}