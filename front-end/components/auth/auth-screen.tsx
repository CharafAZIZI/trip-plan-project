import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { ArrowLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthScreenProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  onBack?: () => void;
};

/** Gabarit commun aux écrans de connexion et d'inscription. */
export function AuthScreen({ title, subtitle, children, footer, onBack }: AuthScreenProps) {
  const colors = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full flex-1 gap-6 self-center px-5 pt-2 pb-6" style={{ maxWidth: 480 }}>
            {onBack ? (
              <IconButton icon={ArrowLeft} label="Retour" onPress={onBack} />
            ) : (
              <View className="h-11" />
            )}

            <View className="gap-2">
              <Text role="heading" aria-level="1" className="text-3xl font-extrabold tracking-tight">
                {title}
              </Text>
              <Text className="text-muted-foreground text-base">{subtitle}</Text>
            </View>

            {children}

            <View className="flex-1" />
            {footer}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}