import { Text, View, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Colors from "@/constants/Colors";
import WelcomeIllustration from "@/components/WelcomeIllustration";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      {/* WhatsApp Logo Circle */}
      <View style={styles.logoContainer}>
        <WelcomeIllustration />
      </View>

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to{'\n'}WhatsApp</Text>
      
      {/* Privacy Policy Text */}
      <View style={styles.privacyContainer}>
        <Text style={styles.privacyText}>
          Read our{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
          . Tap "Agree &{'\n'}Continue" to accept the{" "}
          <Text style={styles.linkText}>Terms of{'\n'}Service</Text>.
        </Text>
      </View>

      {/* Agree & Continue Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  logoContainer: {
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
    color: "#333",
    marginBottom: 80,
    textAlign: "center",
    lineHeight: 42,
  },
  privacyContainer: {
    marginBottom: 100,
    paddingHorizontal: 10,
  },
  privacyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  linkText: {
    color: "#2196F3",
  },
  button: {
    backgroundColor: "#25D366",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 25,
    minWidth: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
