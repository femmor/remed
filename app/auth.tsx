import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/Colors";

const { width } = Dimensions.get("window");

export default function AuthScreen() {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");

  return (
    <LinearGradient colors={[COLORS.green, COLORS.main]} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="medical" size={70} color="white" />
        </View>
        <Text style={styles.title}>Re<Text style={styles.highlight}>Med</Text></Text>
        <Text style={styles.subTitle}>Your Personal Medical Assistant</Text>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.instructionText}>
            {hasBiometrics
              ? "Use Face ID/TouchID or PIN to access your medications"
              : "Enter your PIN to access your medications"}
          </Text>

          <TouchableOpacity style={[styles.button, isAuthenticating && styles.buttonDisabled]} onPress={() => {}} disabled={isAuthenticating}>
            <Ionicons
              name={hasBiometrics ? "finger-print-outline" : "keypad-outline"}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>
              {isAuthenticating
                ? "Verifying..."
                : hasBiometrics
                ? "Authenticate"
                : "Enter PIN"}
            </Text>
          </TouchableOpacity>

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle-outline"
                size={24}
                color={COLORS.danger}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainer: {
        width: 100,
        height: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "light",
        color: COLORS.white,
        marginBottom: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        fontStyle: "italic",
    },
    highlight: {
        color: COLORS.danger,
        fontWeight: "bold",
        fontStyle: "normal",    
    },
    subTitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.9)",
        marginBottom: 40,
        textAlign: "center",
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 30,
        width: width - 40,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: COLORS.textPrimary,
    },
    instructionText: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.5)",
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.green,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonDisabled: {
        opacity: .7,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
        backgroundColor: COLORS.lightRed,
        borderRadius: 8,
    },
    errorText: {
        color: COLORS.danger,
        marginLeft: 5,
        fontSize: 14,
    },
});
