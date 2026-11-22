
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

export default function HomeHeader() {
  const { width } = useWindowDimensions();

  const horizontalPadding = width >= 1024 ? 32 : 20;
  const logoSize = width >= 768 ? 48 : 44;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View
          style={[
            styles.content,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          {/* Application branding */}
          <View style={styles.brand}>
            <Image
              source={require('@/assets/images/tripplan-logo.png')}
              style={{
                width: logoSize,
                height: logoSize,
              }}
              resizeMode="contain"
              accessibilityLabel="Logo TripPlan"
            />

            <Text className="text-xl font-extrabold text-[#2563EB]">
              TripPlan
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },

  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  content: {
    width: '100%',
    maxWidth: 1200,
    minHeight: 72,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
