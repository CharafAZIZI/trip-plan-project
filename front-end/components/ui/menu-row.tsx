import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type MenuRowProps = {
  icon: LucideIcon;
  label: string;
  value?: string;
  onPress?: () => void;
};

/** Ligne de menu (profil, paramètres) avec icône, libellé et chevron. */
export function MenuRow({ icon, label, value, onPress }: MenuRowProps) {
  return (
    <Pressable
      role="button"
      disabled={!onPress}
      onPress={onPress}
      className="min-h-14 flex-row items-center gap-3 py-1.5 active:opacity-70">
      <View className="bg-secondary size-11 items-center justify-center rounded-2xl">
        <Icon as={icon} className="text-primary size-5" />
      </View>
      <Text className="flex-1 text-base font-bold">{label}</Text>
      {value ? <Text className="text-muted-foreground text-sm">{value}</Text> : null}
      {onPress ? <Icon as={ChevronRight} className="text-muted-foreground size-5" /> : null}
    </Pressable>
  );
}