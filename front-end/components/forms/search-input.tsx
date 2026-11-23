import { Icon } from '@/components/ui/icon';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Search } from 'lucide-react-native';
import { TextInput, View } from 'react-native';

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChangeText, placeholder = 'Rechercher…' }: SearchInputProps) {
  const colors = useThemeColors();

  return (
    <View className="bg-card h-14 flex-row items-center gap-3 rounded-2xl px-4 shadow-sm shadow-midnight/5">
      <Icon as={Search} className="text-muted-foreground size-5" />
      <TextInput
        className="text-foreground flex-1 text-base"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
}