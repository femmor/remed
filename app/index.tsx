import { Text, View, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { COLORS } from "@/constants/Colors";

export default function SplashScreen() {
  // Creates a new Animated.Value and assigns it to fadeAnimation
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Starts the animation when the component mounts
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] },
        ]}
      >
        <Ionicons name="medical" size={100} color="white" />
        <Text style={styles.appName}>Re<Text style={styles.highlight}>med</Text></Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  appName: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    letterSpacing: 1,
  },
  highlight: {
    color: COLORS.danger,
  }
});
