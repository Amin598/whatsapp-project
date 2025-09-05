import WelcomeIllustration from "@/components/WelcomeIllustration";
import Colors from "@/constants/Colors";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

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
          . Tap &quot;Agree &amp;{'\n'}Continue&quot; to accept the{" "}
          <Text style={styles.linkText}>Terms of{'\n'}Service</Text>.
        </Text>
      </View>

      {/* Accept & Sign Up Button */}
      <Link href="/(auth)/sign-up" asChild>
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Accept & Sign Up</Text>
        </TouchableOpacity>
      </Link>

      {/* Sign In Link */}
      <Link href="/(auth)/sign-in" asChild>
        <TouchableOpacity style={styles.signInLink}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
      </Link>
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
    marginBottom: 40,
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
      height: 8,
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
  signInLink: {
    marginTop: 20,
    paddingVertical: 12,
  },
  signInText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
