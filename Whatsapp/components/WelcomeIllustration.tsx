import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export default function WelcomeIllustration() {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        {/* Multiple overlapping circles to create the illustration effect */}
        <View style={[styles.innerCircle, styles.circle1]} />
        <View style={[styles.innerCircle, styles.circle2]} />
        <View style={[styles.innerCircle, styles.circle3]} />
        <View style={[styles.innerCircle, styles.circle4]} />
        
        {/* Center WhatsApp icon area */}
        <View style={styles.centerIcon}>
          <View style={styles.phoneShape}>
            <View style={styles.whatsappIcon} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(217, 253, 211, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  innerCircle: {
    position: "absolute",
    borderRadius: 50,
    backgroundColor: "rgba(37, 211, 102, 0.2)",
  },
  circle1: {
    width: 60,
    height: 60,
    top: 30,
    left: 40,
  },
  circle2: {
    width: 40,
    height: 40,
    top: 50,
    right: 35,
  },
  circle3: {
    width: 35,
    height: 35,
    bottom: 60,
    left: 50,
  },
  circle4: {
    width: 45,
    height: 45,
    bottom: 40,
    right: 45,
  },
  centerIcon: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  phoneShape: {
    width: 60,
    height: 60,
    backgroundColor: Colors.green,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  whatsappIcon: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    borderRadius: 8,
  },
});