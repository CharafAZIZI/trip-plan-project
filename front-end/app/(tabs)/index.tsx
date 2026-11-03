
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur TripPlan</Text>
      <Text style={styles.subtitle}>
        Prépare ton prochain voyage !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#172554",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 10,
  },
});
