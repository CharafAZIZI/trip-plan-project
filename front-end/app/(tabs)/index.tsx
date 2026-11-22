
import { View, StyleSheet, ScrollView } from 'react-native';

import { Text } from '@/components/ui/text';
import HomeHeader from '@/components/home/home-header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeHeader />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text variant="h2" className="text-[#172554]">
          Bienvenue sur TripPlan
        </Text>

        <Text className="mt-3 text-center text-[#64748B]">
          Prépare ton prochain voyage !
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },

  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
