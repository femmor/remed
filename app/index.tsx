import { Text, View, StyleSheet, Animated } from "react-native";
import { FontAwesome6 as Icon } from "@expo/vector-icons"
import { useEffect, useRef } from "react";
import { COLORS } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  // Creates a new Animated.Value and assigns it to fadeAnimation
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.5)).current;

  const router = useRouter();

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

    // Sets a timeout to navigate to the auth screen after 2 seconds
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 2000)

    // Clears the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          { opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] },
        ]}
      >
        <Icon name="prescription-bottle-medical" size={80} color="white" />
        <Text style={styles.appName}>Re<Text style={styles.highlight}>Med</Text></Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.main,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
  },
  appName: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "normal",
    marginTop: 10,
    letterSpacing: 1,
    fontStyle: "italic",
  },
  highlight: {
    color: COLORS.danger,
    fontWeight: "bold",
  }
});
