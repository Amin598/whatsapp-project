import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Colors from '@/constants/Colors';

export default function HomePage() {
  const { user } = useUser();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <View style={styles.signedInContainer}>
        <Text style={styles.welcomeTitle}>Welcome to WhatsApp!</Text>
        <Text style={styles.userText}>
          Hello {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  signedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  userText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
});