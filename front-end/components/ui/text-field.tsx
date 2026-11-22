import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, type LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, TextInput, View, type TextInputProps } from 'react-native';

type TextFieldProps = Omit<TextInputProps, 'style'> & {
  label: string;
  icon?: LucideIcon;
  error?: string;
  /** Champ mot de passe : masque la saisie et affiche le bouton œil. */
  secure?: boolean;
  className?: string;
};

export function TextField({
  label,
  icon,
  error,
  secure = false,
  className,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const colors = useThemeColors();
  const [hidden, setHidden] = useState(secure);
  const [focused, setFocused] = useState(false);

  return (
    <View className={className}>
      <Text className="mb-1.5 ml-1 text-sm font-bold">{label}</Text>

      <View
        className={cn(
          'bg-card h-14 flex-row items-center gap-3 rounded-2xl border-2 px-4',
          focused ? 'border-primary' : 'border-transparent',
          error && 'border-destructive'
        )}>
        {icon ? <Icon as={icon} className="text-muted-foreground size-5" /> : null}

        <TextInput
          className="text-foreground flex-1 text-base"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={hidden}
          accessibilityLabel={label}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...inputProps}
        />

        {secure ? (
          <Pressable
            role="button"
            hitSlop={12}
            accessibilityLabel={hidden ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
            onPress={() => setHidden((value) => !value)}>
            <Icon as={hidden ? Eye : EyeOff} className="text-muted-foreground size-5" />
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text role="alert" className="text-destructive mt-1.5 ml-1 text-sm">
          {error}
        </Text>
      ) : null}
    </View>
  );
}