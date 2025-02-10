import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useState, useEffect, useRef, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completeDoses: number;
}

const CircularProgress = ({ progress, totalDoses, completeDoses }: CircularProgressProps) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.55
  const strokeWidth = 15
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }, [progress])

  const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  })

  return (
    <View>
      <View>
        <Text>{Math.round(progress)}%</Text>
        <Text>{completeDoses} of {totalDoses} doses completed.</Text>
      </View>
      <View>
        <Svg width={size} height={size} style={styles.progressRing}>
          <Circle
            stroke={COLORS.primary}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <AnimatedCircle
            stroke={COLORS.green}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
    </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={[COLORS.green, COLORS.main]}>
        <View>
          <View>
            <View>
              <Text>Daily Progress</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        {/* Circular progress */}
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})