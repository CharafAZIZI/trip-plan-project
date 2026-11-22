import { IconButton } from '@/components/ui/icon-button';
import { Text } from '@/components/ui/text';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { Bell } from 'lucide-react-native';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeHeader() {
  const { width } = useWindowDimensions();
  const colors = useThemeColors();

  const horizontalPadding = width >= 1024 ? 32 : 20;
  const logoSize = width >= 768 ? 48 : 44;

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.card }}>
      <View
        style={{
          width: '100%',
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}>
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          {/* Application branding */}
          <View style={styles.brand}>
            <Image
              source={require('@/assets/images/tripplan-logo.png')}
              style={{ width: logoSize, height: logoSize }}
              resizeMode="contain"
              accessibilityLabel="Logo TripPlan"
            />
            <Text className="text-primary text-xl font-extrabold">TripPlan</Text>
          </View>

          <IconButton icon={Bell} label="Notifications" className="shadow-none" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    maxWidth: 1200,
    minHeight: 72,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});